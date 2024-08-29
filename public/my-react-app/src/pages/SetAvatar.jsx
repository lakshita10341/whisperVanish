import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../Assets/loader.gif";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const [isLoading, setIsLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    function fetch(){ 
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
  }
  fetch();
  },[])



  const setProfilePicture = async () => {
    if (selectedAvatar == undefined) {
      
      toast.error("Please select an avatar", toast);
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image : avatars[selectedAvatar],
      });
 
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user));
       

        navigate('/')
      }else{
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };
  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
  
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
  
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container> 
          <div className="title-container">
            <h1>Pick an avatar as your profile picture.</h1>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile picture
            </button>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  .loader {
  }
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    margin-top: 1rem;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      display: flex;
      padding: 0.4rem;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #997af0;
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
    margin-top: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;


