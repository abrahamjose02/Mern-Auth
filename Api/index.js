import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
import userRoutes from './user/routes/user.route.js'
import authRoutes from './user/routes/auth.route.js'


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on Port 3000 !");
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internet Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})