import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

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
        text-decoration: none;
      }
    }
  }`;


export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] =useState({
    Username: "",
    password :"",
    
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
    const { Username, password} = values;
    if(password.length== ""){
      toast.error(
        "username and password are required",toastOptions
      );
      return false;
    }else if(Username.length == ""){
      toast.error(
        "username and password are required",toastOptions
      );
      return false;
 
    }
    return true;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
   if( handleValidation()){
    const { password,  Username} = values;
    const {data} =await axios.post(loginRoute,{
      Username,
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
            min ="3"
          />
        
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">LOGIN</button>
          <span>
            Don't have an account?<Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
};