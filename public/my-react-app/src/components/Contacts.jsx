
 
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Contacts({ contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.Username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const startGroupChat = ()=>{
    navigate('./GrpChat');
  };

  return ( 
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>WhispersVanish</h3>
          </div>
          <div className="contacts">
          <div className="groupChatButton">
            <button onClick={startGroupChat}>Join Session</button>
          </div>

            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact  ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  key={index}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.Username}</h3>
                  </div>
                </div>
              );
            })}
                
          </div>
          <div className="currentUser">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          
        </Container>
      )}
    </>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  padding: 1rem;
  .brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    // text-transform: uppercase;
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 10%;
    }
    h3{
      color: white;
      
    }
  }
  .contacts{
    display : flex;
    flex-direction : column;
    align-items : center;
    // justify-content: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 1rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color : #ffffff39;
        width: 0.1rem;
        border-radius : 1rem;
      }
    }
   .contact{
    background-color : #ffffff39;
    min-height: 5rem;
    width:90%;
    cursor:pointer;
    border-radius:0.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    transition : 0.5s ease-in-out;
    .avatar{
      img{
        height: 4rem;
      }
    }
    .username{
    
    } 
   } 
   .selected{
    background-color: #9186f3;
   }

  }
  .currentUser{
    display: flex;
    justify-content:center;
    flex-direction: column;
    .avatar{
      img{
        height: 4rem;
      }
    }
   }
   @media screen and (min-width:720px) and (max-width:1080px){
   gap : 0.5rem;
   .username{
    h2{
      font-size: 1rem;
    }
   }
  }
  button{
    background-color : #ffffff39;
    padding: 0.5rem;
    font-size: 1.3rem;
    color: white;
    font-weight: 700;

  }
`;
