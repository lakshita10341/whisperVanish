import React, { useEffect, useState , useRef} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";

import axios from "axios";
import { getAllMsgRoute, sendMsgRoutes } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg]= useState(null);
  const scrollRef = useRef();

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMsgRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
       
      }
    };

    if(currentChat){
      fetchData();
    }
  }, [currentChat]);
  

  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMsgRoutes, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      // console.log("Message sent successfully");
      socket.current.emit("send-msg",{
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({fromSelf: true, message: msg});
      setMessages(msgs);
    } catch (error) {
      console.error("Error sending message:", error.message);
   
    }
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
       
        setArrivalMsg({fromSelf : false,
        message: msg});
      });
    }
  },[]);

  useEffect(()=>{
    arrivalMsg && setMessages((prev)=>[...prev, arrivalMsg]);
  },[arrivalMsg]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  },[messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
                <h1>{currentChat.Username}</h1>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="InputMsg">  <ChatInput handleSendMsg={handleSendMsg} /> </div>
          
        </Container>
      )}
    </>
  );
}



const Container = styled.div`
  padding: 1rem;
  display: grid;
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
        }
        h1{
          padding-top: 1rem;
          padding-left : 0.5rem;
        }
      }
    }
  }
  .chat-messages{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message{
      display:flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
       
        padding: 1rem;
        font-size: 1.1rem;
        background-color: #d1d1d1;
        border-radius: 1rem;
      }
    }
    .sended{
      justify-content: flex-end;
      .content{
        background-color: #4f04ff21;
      }
    }
    .recieved{
      justify-content: flex-start;
      .content{
        background-color: #9900ff20;
      }
    }
  }
`;
