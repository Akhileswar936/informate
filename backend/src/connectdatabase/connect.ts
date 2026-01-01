import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const url:string=String(process.env.MONGODB_SRV);
const connectDB=async()=>{
    try
    {
        const connect=await mongoose.connect(url);
    }
    catch(err)
    {
        console.log(err)
    }
}

export default connectDB;