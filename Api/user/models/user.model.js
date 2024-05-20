import { Timestamp } from "bson";
import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
import { PassThrough } from "stream";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type:Number,
      default:0
    },
    profilePicture:{
      type:String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
