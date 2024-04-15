import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";
import showToast from 'crunchy-toast';

function Login (){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

        const response = await axios.post("/login", {

            username:username,
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
            showToast('You are already logged in!', 'warning', 4000);
            
            window.location.href = "/";
        }

    }, [])
 
    return(
      
        <div className="login">
              <Navbar/>
            <form className="main-container mt-5">
                <h2 className="text-center p-2">Login</h2>

                <div>
            <lable htmlFor='username'>Username :-</lable>
            <input type='username' 
              placeholder="Enter your username" 
              id='username' value={username}
              className="input-form"    
              onChange={(e) => {setUsername(e.target.value)}}/>
           </div>

           <div>
            <lable htmlFor='password'>Password :-</lable>
            <input type='password' 
              placeholder="Enter your password" 
              id='password' value={password}
              className="input-form"
              onChange={(e) => {setPassword(e.target.value)}}/>
           </div>

           <button type="button" className="button ms-5 "
              onClick={login}
           > Login </button>
          
          <p className="text-center">
          <Link to="../signup" className="address-link" >Create new Account 👈</Link>

          </p>
           
            </form>

        </div>
    )
}

export default Login