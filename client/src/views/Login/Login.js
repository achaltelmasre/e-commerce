import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";

import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";

function Login (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

        const response = await axios.post("/login", {

            email:email,
            password:password
        })

        
        alert(response?.data?.message);

        if (response?.data?.success) {
            localStorage.setItem("user", JSON.stringify(response?.data?.data));
        }

        if (response?.data?.success) {
            alert(response?.data?.message);
            window.location.href = "./";
        }

    }

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}')
        
        if (storageUser?.email) {
            alert("You are already logged in!");
            window.location.href = "/";
        }

    }, [])
 
    return(
      
        <div className="login">
              <Navbar/>
            <form className="main-container">
                <h1 className="text-center">Login</h1>

                <div>
            <lable htmlFor='email'>Email:</lable>
            <input type='email' 
              placeholder="Enter your email" 
              id='email' value={email}
              className="input-form"
              onChange={(e) => {setEmail(e.target.value)}}/>
           </div>

           <div>
            <lable htmlFor='password'>Password:</lable>
            <input type='password' 
              placeholder="Enter your password" 
              id='password' value={password}
              className="input-form"
              onChange={(e) => {setPassword(e.target.value)}}/>
           </div>

           <button type="button" className="ps-5 pe-5 mt-5 signup-btn"
              onClick={login}
           > Login </button>
          
          <p className="text-center">
          <Link to="../signup" className="address-link" >Create new Account</Link>

          </p>
           
            </form>

        </div>
    )
}

export default Login