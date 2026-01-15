import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const url:string=String(process.env.MONGODB_SRV);
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  }
};


export default connectDB;