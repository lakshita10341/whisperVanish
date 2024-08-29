
import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute, host } from '../utils/APIRoutes';
import Contacts from "../components/Contacts";
import Welcomes from '../components/Welcomes';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat]= useState(undefined);
  const [isLoaded , setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('chat-app-user')) {
          navigate('/login');
        } else {
          const userData = JSON.parse(localStorage.getItem('chat-app-user'));
          console.log('User Data:', userData);
          
          setCurrentUser(userData);
  
          if (userData) {
            if (userData.isAvatarImageSet) {
              const response = await axios.get(`${allUserRoute}/${userData._id}`);
              setContacts(response.data);
              setIsLoaded(true);
            } else {
              navigate('/setAvatar');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
  
    fetchData();
  }, []); 


  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user", currentUser._id);

    }
  },[currentUser])
  
  const handleChatChange = (chat) => {
    // console.log("Setting currentChat:", chat);
    setCurrentChat(chat);
  };  

  

 
return (
  <Container>
    <div className="container">
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      {(isLoaded && currentChat === undefined)
      ? <Welcomes /> : <ChatContainer currentChat={currentChat} currentUser ={currentUser} socket={socket} />}
    </div>
  </Container>
);
 
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:1rem;
color: white;
background-color:rgba(0,0,0,0.5);
.container{

  height:85vh;
  width:85vw;
  background-color: rgba(0,0,0,0.7);
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%; 
  }
}
`;
