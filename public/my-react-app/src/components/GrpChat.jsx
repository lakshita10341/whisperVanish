import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import { io } from "socket.io-client";
import Logo from "../Assets/Logo.png";
import { useNavigate } from 'react-router-dom';


function GrpChat() {
  const socket = io("http://localhost:5000");
  const messageContainer = useRef();
  const navigate = useNavigate();
  const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.current.appendChild(messageElement);
  };


  const handleClick = () => {
 socket.disconnect();
    navigate('/');
  };

  
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          const userData = JSON.parse(localStorage.getItem("chat-app-user"));

          socket.emit("new-user-joined", userData.Username);

          socket.on("user-joined", (name) => {
            append(`${name} joined the chat`, "left");
          });
          socket.on("recieve", (data) => {
            append(`${data.name} : ${data.message}`, "left");
          });

          socket.on("left", (name) => {
            append(`${name} left the chat`, "left");
          });
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendMsg = (msg) => {
    append(`You : ${msg}`, "right");
    socket.emit("send", msg);
  };

  return (
    <>
      <Container>
        <div className="content-area">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={Logo} alt="avatar" />
                <h1>Group Session</h1>
              </div>
            </div>
           <button onClick ={handleClick}>Leave Session</button>
          </div>

          <div className="chat-messages">
            <div className="messages clearfix" ref={messageContainer}>
            {/* <div id="leftMessageContainer"></div> */}
            </div>
        
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid black dotted;
  .content-area {
    padding: 1rem;
    display: grid;
    height: 80vh;
    width: 80vw;
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
    grid-template-rows: 8% 84% 8%;
    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem;
      .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
          display: flex;
          img {
            height: 3rem;
            border-radius: 25%;
          }
          h1{
            padding-top: 1rem;
            padding-left : 0.5rem;
          }
        }
      }
      button{
        background-color: #ffffff39;
        color: white;
        padding : 0.5rem;
border-radius : 0.5rem;
        border: 0.1rem solid transparent;
        cursor: pointer;
        &:hover{
          border-color: white;
      }
      }
    }
    .chat-messages {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      // .clearfix::after {
      //   content: "";
      //   display: table;
      //   clear: both;
      // }
      .messages{ 
          
      
      
      .message{
        
        padding: 1rem;
        font-size: 1.1rem;
        width: 24%;
        border-radius: 20%;
        // border: 0.5rem solid black;
        margin: 0.5rem;
      }
      }
      .right{
        background-color: #4f04ff21;
        float: right;
        clear: both;
      }
      .left{
        background-color: #9900ff20;
        float: left;
        clear: both;
      }
   
    }
  }
`;

export default GrpChat;
