import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { AuthRequest } from "../types";

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the access token from the request headers
  const token = req.header("authorization");

  // Check if no token is provided
  if (!token) {
    return res
      .status(403)
      .json({ msg: "No access token, authorization denied" });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(
      token.substring(7), // removing "Bearer "
      process.env.JWT_SECRET as string
    ) as IUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Access token is not valid" });
  }
};

export default authMiddleware;
