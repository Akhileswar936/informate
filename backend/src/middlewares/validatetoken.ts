import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
const key = process.env.SECRECT_KEY as string;

const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      res.status(401).json({ msg: "No token provided" });
      return;
    }
    const token = auth.split(" ")[1];
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        //res.status(401).json({ msg: "Invalid token" });
        res.status(401).json({
            msg: "You are not logged in. Please log in to continue.",
            code: "AUTH_REQUIRED"
          });

        return;
      }
      req.user = (decoded as JwtPayload).user;
      next();
    });
  }
);

export default validateToken;