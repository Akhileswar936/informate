import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./connectdatabase/connect";
import userrouter from "./routes/userRoute";
import feedrouter from "./routes/feedRoute";

dotenv.config();

const app: Application = express();

app.use(express.json());



connectDB();


app.use(cors({ origin: 'https://informate.onrender.com', credentials: true }));




app.use('/user', userrouter);
app.use('/feed',feedrouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ msg: err.message });
});

const port = Number(process.env.PORT) | 9999;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
