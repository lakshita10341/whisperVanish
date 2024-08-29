import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import Robot from "../Assets/robot.gif";
import Logout from "./Logout";


export default function Welcomes() {
    const [UserName, setUserName] = useState();

    useEffect(() => {
      const getUsername = async () => {
        try {
          const userData = await JSON.parse(localStorage.getItem('chat-app-user'));
          if (userData && userData.Username) {
            setUserName(userData.Username);
          } else {
            // Handle the case where the username is not available
            console.error('Username not found in user data.');
          }
        } catch (error) {
          // Handle errors related to JSON parsing or other issues
          console.error('Error fetching username:', error);
        }
      };
    
      getUsername();
    }, []);
    
  return (
    <Container>
      <div class="logout"> 
      <Logout />
      </div>
        <img src={Robot}/>
        <div>
        <h1>Welcome, <span>{UserName}!</span></h1>
        <h3>Select a chat to start messaging</h3>
        </div>
    </Container>
  )
}
const Container = styled.div`

position: relative;
  .logout{
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;

  }
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    img{
        height: 20rem;
    }
    span{
        color:#9e42f5;
    }

`;
