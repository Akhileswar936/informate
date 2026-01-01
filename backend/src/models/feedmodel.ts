import mongoose,{Document} from "mongoose";


export interface FeedData extends Document
{
    user_id:mongoose.Types.ObjectId;
    username:string,
    field:string,
    title:string,
    info:string,
    image:string
}
const feedSchema=new mongoose.Schema<FeedData>(
    {
        user_id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        field:String,
        title:String,
        info:String,
        image:String
    },
    {
        timestamps:true
    }
)
const Feed=mongoose.model("Feed",feedSchema);

export default Feed