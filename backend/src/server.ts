import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./connectdatabase/connect";
import userrouter from "./routes/userRoute";
import feedrouter from "./routes/feedRoute";

dotenv.config();

const app: Application = express();


app.use(cors({
  origin: [
    "https://www.informate.co.in",
    "https://informate.onrender.com",
    "https://informate-info.vercel.app"
  ],
  credentials: true
}));

app.get('/welcome', (req: Request, res: Response) => {
  res.status(200).json({
    title: "Information Sharing Platform for Startup Ideas"
  });
});

app.get('/info', (req: Request, res: Response) => {
  res.status(200).json({
    message: "A freelancing platform for smart startup ideas, personalized knowledge delivery, and professional networking"
  });
});

app.use(express.json());



connectDB();





/* https://informate-info.vercel.app
  https://informate.onrender.com 
  https://www.informate.co.in
*/

app.use('/user', userrouter);
app.use('/feed',feedrouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ msg: err.message });
});

const port = Number(process.env.PORT) | 9999 ;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
