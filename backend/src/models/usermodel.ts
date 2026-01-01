import mongoose, { Document } from "mongoose";

export interface Register extends Document {
  name: string;
  email: string;
  username: string;
  field: string;
  password: string;
  image: string;
  code: string;
  bookmark: mongoose.Types.ObjectId[];
  reqSent: mongoose.Types.ObjectId[];
  reqRecieved: mongoose.Types.ObjectId[];
  connections: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<Register>(
  {
    name: String,
    email: String,
    username: String,
    field: String,
    password: String,
    image: { type: String, default: "./main.jpg" },
    code: { type: String, default: "" },
    bookmark: { type: [mongoose.Schema.Types.ObjectId],  ref:"User",default: [] },
    reqSent: { type: [mongoose.Schema.Types.ObjectId], ref:"User", default: [] },
    reqRecieved: { type: [mongoose.Schema.Types.ObjectId], ref:"User", default: [] },
    connections: { type: [mongoose.Schema.Types.ObjectId], ref:"User", default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<Register>("User", userSchema);

export default User;
