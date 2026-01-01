import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import User from "../models/usermodel";
import Feed, { FeedData } from "../models/feedmodel";
import mongoose from "mongoose";
import FeedBack from "../models/feedbackmode";


const createpost=asyncHandler(async(req:Request,res:Response)=>{
        const id=req.user.id;
        const user=await User.findOne({_id:id});
        const username=user?.username;
        const field=user?.field;
        const image=user?.image;
        const {title,info}=req.body;
        if(!title || !info)
        {
            res.status(400).json({msg:'all fields must be required'});
            return ;
        }
        const feed:FeedData = await Feed.create({user_id:new mongoose.Types.ObjectId(id),username,field,title,info,image});
        res.status(201).json({msg:'sucessfully created'})

})
const getposts=asyncHandler(async(req:Request,res:Response)=>{
    const user_id=req.user.id;
    const feeds=await Feed.find({user_id}).sort({createdAt:-1});
    res.status(200).json({feeds})
})

const deleteposts=asyncHandler(async(req:Request,res:Response)=>{
     const id=req.params.id;
     await Feed.findByIdAndDelete({_id:id});
     res.json({msg:'delete succefully'});
})

const feeback=asyncHandler(async(req:Request,res:Response)=>{
    const {email,feedback}=req.body;
    const id=req.user.id;
    const user=await User.findOne({_id:id});
    const existsemail=user?.email;
    if(!email || !feedback)
    {
         res.status(400).json({msg:'all fields must be required'});
         return ;
    }
    if(existsemail!=email)
    {
       res.status(400).json({ msg: 'Use the email registered on our website.' });
       return ;
    }
    await FeedBack.create({email,feedback})
    res.status(201).json({msg:'succefully feedback is added'})
})
const bookmark=asyncHandler(async(req:Request,res:Response)=>{
    const feed_id=req.params.id;
    const u_id=req.user.id;
    const user=await User.findOne({_id:u_id});
    const bookmarks=user?.bookmark;
    if(bookmarks?.includes(new mongoose.Types.ObjectId(feed_id)))
    {
        res.status(400).json({msg:'Already bookmarked'})
        return ;
    }
    await User.findByIdAndUpdate(u_id, { $addToSet: { bookmark: new mongoose.Types.ObjectId(feed_id) } },{ new: true });
    res.status(200).json({msg:'sucessfully added'});

})
const getbookmarks = asyncHandler(async (req: Request, res: Response) => {
  const u_id = req.user.id;
  const user = await User.findOne({_id:u_id});
  const feed_ids=user?.bookmark;
  const bookmarks=await Feed.find({_id:{$in:feed_ids}})
  const sortedFeeds = feed_ids?.slice().reverse().map(id => bookmarks.find(feed => String(feed._id) === String(id)))
  .filter(Boolean);
  res.status(200).json({ bookmarks:sortedFeeds});
});
const deletebookmark=asyncHandler(async(req:Request,res:Response)=>{
    const feed_id=req.params.id;
    const u_id=req.user.id;
     await User.findByIdAndUpdate(u_id, { $pull: { bookmark: new mongoose.Types.ObjectId(feed_id) } },{ new: true });
    res.status(200).json({msg:'sucessfully deleted'});

})
const connectionfeeds=asyncHandler(async(req:Request,res:Response)=>{
      const id=req.user.id;
      if(!id)
      {
        res.status(200).json({msg:"user not found"});
        return ;
      }
      const user=await User.findOne({_id:id});
      const connections=user?.connections;
      const feeds=await Feed.find({user_id:{$in:connections}})
      res.status(200).json({feeds});
})
const nonconnectionfeeds=asyncHandler(async(req:Request,res:Response)=>{
       const id=req.user.id;
      if(!id)
      {
        res.status(200).json({msg:"user not found"});
        return ;
      }
      const user=await User.findOne({_id:id});
       if(!user)
      {
        res.status(200).json({msg:"user not found"});
        return ;
      }
      const connections=user.connections;
      const feeds=await Feed.find({user_id:{$nin:[id,...connections]}})
      res.status(200).json({feeds});
})
const userfeeds=asyncHandler(async(req:Request,res:Response)=>{
         const id=req.params.id;
         const user=await User.findOne({_id:id})
         const feeds=await Feed.find({user_id:id}).sort({createdAt:-1});
         res.status(200).json({user,feeds})
})
export default {createpost,getposts,deleteposts,connectionfeeds,nonconnectionfeeds,feeback,bookmark,getbookmarks,deletebookmark,userfeeds}