import { NextFunction } from "express";
import { Request, Response } from "express";
import allowedOrigins from "../config/allowedOrigins";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  console.log(`Origin: ${origin}`);
  if (origin && allowedOrigins.includes(origin.toString())) {
    console.log(`Setting Access-Control headers for origin ${origin}`);
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  } else {
    console.log(`Not an allowed origin ${origin}`);
  }
  next();
};

export default credentials;
