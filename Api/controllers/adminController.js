import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const adminLogin = async(req,res,next)=>{
    const{email,password} = req.body
    try {
        const validAdmin = await User.findOne({email:email})
        if(!validAdmin) return next(errorHandler(401,"Invalid Creditentails"))
        const validPassword = bcryptjs.compareSync(password,validAdmin.password);
        if(!validPassword) return next(errorHandler(401,"Invalid Creditentials"));
        if(validAdmin.isAdmin !== 1) return next(errorHandler(401,"You are not an Admin"));

        const{password:hashedPassword,...rest} = validAdmin._doc;
        const token = jwt.sign({_id:validAdmin._id},process.env.JWT_ADMIN_SECRET)
        const expiryDate = new Date(Date.now()+36000000)
        res.cookie("admin_access_token",token,{ httpOnly:true,expires:expiryDate})
            .status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
      const allUsers = await User.find({ isAdmin: 0 });
      res.status(200).json(allUsers);
      console.log(allUsers)
    } catch (error) {
      next(error);
    }
  };
  
  export const getUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log(userId)
  
      const user = await User.findById({_id:userId});
      
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        {_id:userId},
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
          },
        },
        { new: true }
      );
      res.status(200).json("Updated Successfully");
    } catch (error) {
      next(error);
    }
  };
  
  
   export const deleteUser = async(req,res,next)=>{
    try {
      const userId = req.params.userId
      console.log(userId)
      const deletedUser = await User.findByIdAndDelete({_id:userId})
      res.status(200).json("user deleted")
    } catch (error) {
      next(error)
    }
   
  }
  
  export const createUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are mandatory" });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
  
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(200).json({ success: true, message: "User created" });
    } catch (error) {
      next(error);
    }
  };
  
  export const adminSignOut = async(req,res,next)=>{
    try {
      res.clearCookie('admin_access_token').status(200).json("signout success")
    } catch (error) {
      next(error)
    }
  }