import { Timestamp } from "bson";
import { timeStamp } from "console";
import mongoose from "mongoose";
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
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
