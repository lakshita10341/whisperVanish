import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    gap: 1rem;
    color: white;
    // text-transform: uppercase;
    img {
      height: 5rem;
      width: 5rem;
      border-radius: 10%;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: black;
    padding: 3rem 5rem;
    border-radius: 5%;
    input {
      padding: 1rem;
      background-color: transparent;
      border: 0.1rem solid white;
      color: white;
      border-radius: 5%;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid white;
        color: white;
        border-radius: 5%;
        font-size: 1.1rem;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 7%;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      text-decoration: none;
      font-weight: bold;
      a{
        text-decoration:none;
      }
    }
  }`;


export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] =useState({
    Username: "",
    email :"",
    password :"",
    confirmPassword:"",
  });

  const toastOptions ={
    position: "bottom-right",
    autoClose :8000,
    pauseOnHover:true,
    draggable: true,
    theme: "dark",
  }

  useEffect(()=>{
   
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  
  },[])

  const handleChange = (event) => {
    setValues({
      ...values,[event.target.name]:event.target.value
    });
  };
  

  const handleValidation =() =>{
    const { password, confirmPassword, Username, email} = values;
    if(password !== confirmPassword){
      
      toast.error("password and confirm password must be same",
      toastOptions);
      return false;
    }else if(Username.length<3){
      toast.error(
        "username should be greater than 3 characters",toastOptions
      );
      return false;
    }else if(password.length<8){
      toast.error(
        "password should be greater than 8 characters",toastOptions
      );
      return false;
    }else if(email == ""){
      toast.error(
        "email is required",toastOptions
      )
      return false;
    }
    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
   if( handleValidation()){
    const { Username, email,  password} = values;
    const {data} =await axios.post(registerRoute,{
      Username,
      email,
      password,
    });
    if(data.status ==false){
      toast.error(data.msg,toastOptions);
    }
    if(data.status == true){
      localStorage.setItem('chat-app-user',JSON.stringify(data.user));
      navigate('/');
    }
   }
  };
  
  return (
    <>
  
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>WhispersVanish</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account?<Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
};


