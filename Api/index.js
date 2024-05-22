import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";

import adminRouter from "./routes/AdminRoute.js";


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
app.use(cookieParser());


app.listen(3000, () => {
  console.log("Server listening on Port 3000 !");
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internet Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})