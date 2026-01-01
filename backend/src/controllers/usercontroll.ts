import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import User from "../models/usermodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

import Feed from "../models/feedmodel";
import mongoose from "mongoose";
dotenv.config();
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const key = String(process.env.SECRECT_KEY);
const url = process.env.URL as string;
const apikey = process.env.Brevo_API_KEY as string;

interface BrevoEmailRequest {
  sender: {
    name: string;
    email: string;
  };
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}

const registeruser = asynchandler(async (req: Request, res: Response) => {
  const { name, email, username, field, password, re_password } = req.body;

  if (!name || !email || !username || !field || !password || !re_password) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ msg: "Email already exists" });
    return;
  }

  const username_ = await User.findOne({ username });
  if (username_) {
    res.status(400).json({ msg: "Choose a unique username" });
    return;
  }

  if (password !== re_password) {
    res.status(400).json({ msg: "Both passwords must be identical" });
    return;
  }

  const hash_password = await bcrypt.hash(password, 4);
  await User.create({ name, email, username, field, password: hash_password });

  const body: BrevoEmailRequest = {
    sender: {
      name: "info",
      email: "akhileswar936@gmail.com"
    },
    to: [
      {
        email:email
      }
    ],
    subject: "Welcome to Informate!",
    htmlContent: `
      <h2>Hello ${name},</h2>
      <h3>Welcome to <span style="color: blue;">Informate</span></h3>
      <p>Thank you for joining our community. We're excited to have you here!</p>
      <p>Feel free to share your thoughts and experiences with others.</p>
    `
  };

  try {
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apikey
      }
    });

    res.status(201).json({ msg: "Registration successful" });
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
});

const loginuser = asynchandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Email and password are required" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ msg: "Account not found. Please register" });
    return;
  }

  const valid: boolean = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(400).json({ msg: "Invalid password" });
    return;
  }

  const token = jwt.sign({ user: { id: user._id } }, key, { expiresIn: "14d" });
  res.status(200).json({ token });
});


const userinfo = asynchandler(async (req: Request, res: Response) => {
  const id = req.user.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }
  res.status(200).json({user});
});

const forgetpassword = asynchandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as { email?: string };

    if (!email) {
      res.status(400).json({ msg: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Account not found. Please register" });
      return;
    }

    const otp = (): string => {
      const arr = [..."0123456789abcdef"];
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += arr[Math.floor(Math.random() * arr.length)];
      }
      return code;
    };

    const code = otp();
    await User.findOneAndUpdate({ email }, { $set: { code } }, { new: true });

    const body: BrevoEmailRequest = {
      sender: {
        name: "info",
        email: "akhileswar936@gmail.com"
      },
      to: [
        {
          email
        }
      ],
      subject: "Password Reset Request",
      htmlContent: `
        <h2><span style="color: blue;">Informate</span></h2>
        <p>You requested to reset your password.</p>
        <p>Please use the OTP below to proceed:</p>
        <h2>OTP: <strong>${code}</strong></h2>
      `
    };

    try {
      await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apikey
        }
      });

      res.status(201).json({ msg: "OTP sent successfully" });
    } catch (err: any) {
      res.status(500).json({ msg: "Failed to send OTP email", error: err.message });
    }
  }
);

const setpassword = asynchandler(async (req: Request, res: Response) => {
  const { email, otp, password, re_password } = req.body;

  if (!email || !otp || !password || !re_password) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ msg: "Account not found. Please register" });
    return;
  }

  if (otp !== user.code) {
    res.status(400).json({ msg: "Invalid OTP" });
    return;
  }

  if (password !== re_password) {
    res.status(400).json({ msg: "Both passwords must be identical" });
    return;
  }

  await User.findOneAndUpdate({ email }, { $unset: { code: 1 } }, { new: true });

  const hash_password = await bcrypt.hash(password, 4);
  await User.findOneAndUpdate({ email }, { $set: { password: hash_password } });

  res.status(200).json({ msg: "Password updated successfully" });
});

const updateprofile = asynchandler(async (req: Request, res: Response) => {
  const { name, username } = req.body;
  const id = req.user?.id;

  if (!name?.trim() || !username?.trim() || !req.file) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  const u_name_exists = await User.findOne({
    username,
    _id: { $ne: id }
  });

  if (u_name_exists) {
    res.status(400).json({ msg: "username already exists" });
    return;
  }

  const result = await uploadToCloudinary(req.file);

  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name.trim(),
        username: username.trim(),
        image: result.secure_url
      }
    },
    { new: true }
  );

  await Feed.updateMany(
    { user_id: id },
    {
      $set: {
        image: result.secure_url,
        username: username.trim()
      }
    }
  );

  res.status(200).json({ msg: "updated" });
});
const connentsUsers=asynchandler(async(req:Request,res:Response)=>{
     const id=req.user.id;
     if(!id)
     {
        res.status(400).json({msg:'user not found'});
        return ;
     }
     const user=await User.findOne({_id:id});
     if(!user)
     {
        res.status(400).json({msg:'user not found'});
        return ;
     }
     const users=await User.find({_id:{$nin:[id,...user.reqSent,...user.reqRecieved,...user.connections]}})
     res.status(200).json({users})
})
const requestSent=asynchandler(async(req:Request,res:Response)=>{
      const id=req.user.id;
      const request_user_id=req.params.id;
      if(!id)
     {
        res.status(400).json({msg:'user not found'});
        return ;
     }
     await User.findOneAndUpdate({_id:id},{$addToSet:{reqSent:new mongoose.Types.ObjectId(request_user_id)}},{new:true})
     await User.findByIdAndUpdate(request_user_id,{$addToSet:{reqRecieved:new mongoose.Types.ObjectId(id)}},{new:true})
     res.status(200).json({msg:'request sent'})
})
const requestsdisplay=asynchandler(async(req:Request,res:Response)=>{
        const id=req.user.id;
         if(!id)
        {
            res.status(400).json({msg:'user not found'});
            return ;
        }
       const user=await User.findOne({_id:id});
       if(!user)
       {
            res.status(400).json({msg:'user not found'});
            return ;
       }
       const requests=user.reqRecieved;
       const users=await User.find({_id:{$in:requests}})
       res.status(200).json({users})    
})
const requestaccept=asynchandler(async(req:Request,res:Response)=>{
       const id=req.user.id;
       const request_id=req.params.id;
       await User.findByIdAndUpdate(id,
                        { 
                          $addToSet:{connections:new mongoose.Types.ObjectId(request_id)},
                          $pull:{reqRecieved:new mongoose.Types.ObjectId(request_id)}
                        },{new:true})
       await User.findByIdAndUpdate(request_id,
                               {
                                  $addToSet:{connections:new mongoose.Types.ObjectId(id)},
                                  $pull:{reqSent:new mongoose.Types.ObjectId(id)}
                                },{new:true})
       res.status(200).json({msg:'request accept'})
})
const requestreject=asynchandler(async(req:Request,res:Response)=>{
      const id=req.user.id;
      const request_id=req.params.id;
      await User.findByIdAndUpdate(id,{$pull:{reqRecieved:new mongoose.Types.ObjectId(request_id)}});
      await User.findByIdAndUpdate(request_id,{$pull:{reqSent:new mongoose.Types.ObjectId(id)}})
      res.status(200).json({msg:'request reject'})
})
const connectionsDisplay=asynchandler(async(req:Request,res:Response)=>{
      const id=req.user.id;
      const user=await User.findOne({_id:id})
      const connect_users=user?.connections;
      const users=await User.find({_id:{$in:connect_users}})
      res.status(200).json({users})    
})
const deleteconnection=asynchandler(async(req:Request,res:Response)=>{
  const id=req.user.id; 
  const req_user_id=req.params.id;
  await User.findByIdAndUpdate(id,{$pull:{connections:new mongoose.Types.ObjectId(req_user_id)}},{new:true});
  await User.findByIdAndUpdate(req_user_id,{$pull:{connections:new mongoose.Types.ObjectId(id)}},{new:true});
  res.status(200).json({msg:'delete connection sucessfully'})
})


export default { registeruser, loginuser,userinfo, forgetpassword, setpassword,updateprofile,connentsUsers,requestSent,
                 requestaccept,requestsdisplay,requestreject,connectionsDisplay,deleteconnection};
