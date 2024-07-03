import React from "react";
import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Landing.css';
import Loan from './Loan';
const Landing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state;
    const [requests,setRequests] = useState([]);
    const [rMessage,setRMessage] = useState("");

   
    useEffect(() => {
        fetch("http://localhost:8000/request/reqs",{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: user.mobile,
                    
                }),
        })
        .then((res) => res.json())
        .then((data) => {
          if(data.status === 'success') {
            setRMessage("Your Reqests");
            setRequests(data.loans);
          } else {
            setRMessage("You didn't made any Loan Requests");
          }
        });
      },[user.mobile]);
    return(
        <div>
            <div class="top">
                <div class="mr-auto display-4">Welcome {user.name}</div>
                <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
            </div>
            <br/>
            <div class="h3">{rMessage}</div>
            <Loan data = {requests}/>
        </div>
    );
}

export default Landing;