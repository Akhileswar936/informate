

import mongoose,{Document} from "mongoose";
export interface FeedBackmodel extends Document
{
    email:string,
    feedback:string
}
const feedbackSchema=new mongoose.Schema<FeedBackmodel>(
    {
        email:String,
        feedback:String
    },
    {
        timestamps:true
    }
)
const FeedBack=mongoose.model('FeedBack',feedbackSchema);
export default FeedBack;