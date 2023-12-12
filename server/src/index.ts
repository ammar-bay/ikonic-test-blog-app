import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter, postRouter } from "./routes";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConnect";
import authMiddleware from "./middleware/auth";
import authRouter from "./routes/authRoute";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials";

connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
console.log(`Cors applied`);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.use("/auth", authRouter);

app.use(authMiddleware);
app.use("/users", userRouter);
app.use("/posts", postRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
  );
});
