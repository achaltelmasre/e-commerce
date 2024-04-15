import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import showToast from 'crunchy-toast';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  const signup = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !address ||
      !gender
    ) {
      showToast('Please enter all fields', 'alert', 6000);

      return;
    }

    const response = await axios.post("/api/signup", {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
      gender: gender,
    });

    alert(response?.data?.message);

    if (response?.data?.success) {
      alert(response?.data?.message);
      window.location.href = "/login";
    }
  };

  useEffect(() => {                                      
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storageUser?.email) {
      showToast('You are already logged in!', 'warning', 4000);

      window.location.href = "/";
    }
  }, []);

  return (
    <div className="signup">
      <Navbar />
      <form className="main-container">
        <h2 className="text-center p-3"> Signup</h2>

        <div>
          <lable htmlFor="name" className="ms-4">
            Name :-
          </lable>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            className="input-form "
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <lable htmlFor="email" className="ms-4">
            Email:-
          </lable>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            className="input-form "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
        <lable htmlFor="mobile">MobileNo :-</lable>
          <input
            type="text"
            placeholder="Enter your mobile number"
            id="mobile"
            value={mobile}
            className="input-form"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />

          <lable htmlFor="password">Password:-</lable>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            className="input-form"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
         

          <lable htmlFor="address" className="ms-2">
            Address :-
          </lable>
          <input
            type="text"
            placeholder="Enter your address"
            id="address"
            value={address}
            className="input-form"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

<lable className="ms-3"> Gender :-</lable>
          <input
            type="radio"
            name="gender"
            id="male"
            className="gender ms-5"
            checked={gender === "male"}
            onClick={(e) => {
              setGender("male");
            }}
          />
          <label htmlFor="male">Male </label>

          <input
            type="radio"
            name="gender"
            id="female"
            className="gender ms-5"
            checked={gender === "female"}
            onClick={(e) => {
              setGender("female");
            }}
          />
          <label htmlFor="female">Female </label>
        </div>

      
        <button
          type="button"
          className=" button signup-btn mt-4"
          onClick={signup}
        >
          Signup
        </button>

        <p className="text-center">
          <Link to="../login" className="address-link  fs-5">
            Already have Account 👈
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;