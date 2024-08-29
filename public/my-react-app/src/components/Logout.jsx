import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BiPowerOff} from 'react-icons/bi';

function Logout() {
const navigate = useNavigate();
    const handleClick = async()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <Button className='buton' onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}
const Button = styled.button`
display : flex;
justify-content: center;
padding : 0.5rem;
border-radius : 0.5rem;
color: white;
background-color: rgba(0,0,0,0);
border: 0.1rem solid transparent;
cursor: pointer;
svg{
    font-size: 1.3rem;
}
&:hover{
    border-color: white;
}
`;
export default Logout