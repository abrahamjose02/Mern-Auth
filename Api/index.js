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
  .catch(() => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on Port 3000 !");
});

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes);