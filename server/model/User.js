import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
      type:String,
      default: "-",
    },
    email:{
       type: String,
       unique: true,
       required: true,
    },
    password:{
        type: String,
        required: false,
    },
    mobile:{
        type: Number,
        required: true,
        unique:true,
        
    },
    address: {
        type:String,
    },
    gender: {
        type:String,
        default: "prefer not to say",
    }
},
{
    timestamps:true,
});

const User = model("User", UserSchema);

export default User;