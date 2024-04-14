import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import User from "./model/User.js";

const app = express();
app.use(express.json());

const MONGODB_URI = "";
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
       console.log ('MongoDB connected'); 
    }
};

//post /singup
app.post("/signup1", async (req, res) => {
    const {
        name,
        email,
        password,
        mobile,
        address, 
         gender
    } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender:gender
    })

    try{
        const savedUser = await user.save();
   
        res.json({
            success: true,
            data: savedUser,
            message: " User created successfully "
        })
      }
      catch(e){
       res.json({
           success: false,
           message: e.message
       }) 
    }
});

//post/ login
app.post("/login", async (req, res ) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "please provide email and password"
        })
    }

    const  user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")
    
    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });   
    }
    else{
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on  port: ${PORT} `)
    connectDB();
});