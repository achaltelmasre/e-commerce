import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Signup.css';
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('female');

    
    const signup = async () => {

        if (!name || !email || !password || !mobile || !address || !gender) 
        {
           alert('Please enter all fields')
           return 
        }
     
        const response = await axios.post("/signup", {
              
                name:name,
                email:email,
                password:password,
                mobile:mobile,
                address:address,
                gender:gender
            })

            alert(response?.data?.message);

            if (response?.data?.success) {
                alert(response?.data?.message);
                window.location.href = "/login";
            }
    };

    useEffect(() =>{
      const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

      if (storageUser?.email) {
         alert("You are already logged in!");
         window.location.href = "/";
      }
    }, [])
 
    return(
      <div className="signup">
         <Navbar />
        <form className="main-container">
           <h1 className="text-center"> Signup</h1>

           <div>
            <lable htmlFor='name'>Name:</lable>
            <input type='text' placeholder="Enter your name" id='name' value={name}
            className="input-form"
             onChange={(e) => {setName(e.target.value)}}
            />
           </div>

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

           <div>
            <lable htmlFor='mobile'>MobileNo.:</lable>
            <input type='text' 
              placeholder="Enter your mobile number"
              id='mobile' value={mobile}
              className="input-form"
              onChange={(e) => {setMobile(e.target.value)}}/>
           </div>

           <div>
            <lable htmlFor='address'>Address:</lable>
            <input type='text'
              placeholder="Enter your address"
              id='address' value={address}
              className="input-form"
              onChange={(e) => {setAddress(e.target.value)}}/>
           </div>

           <div>
           <lable htmlFor='gender'>Gender:</lable>
            
            <input type="radio"
                 name="gender"
                  id="male" 
                  className="gender" 
                  checked={gender === "male"} 
                  onClick={(e) => { setGender("male")}}/>
            <label htmlFor="male">Male </label>

            <input type="radio" name="gender"     
                   id="female" 
                   className="gender" 
                   checked={gender === "female"}
                   onClick={(e) => { setGender("female")}}/>
            <label htmlFor="female">Female </label>
           </div>

           <button type="button" className="mt-5 ps-5  pe-5 signup-btn"
            onClick={signup}>
             Signup
           </button>

          <p className="text-center">
          <Link to="../login" className="address-link" >Already have Account</Link>

          </p>
         </form>
      </div>
        )
}
export default Signup