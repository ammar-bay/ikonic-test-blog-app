import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import authMiddleware from "../middleware/auth";
import authorizeMiddleware from "../middleware/authorize";

const authRouter = express.Router();

// Register user
authRouter.post("/register", registerUser);

// Register admin
authRouter.post(
  "/register-admin",
  authMiddleware,
  authorizeMiddleware(["admin"]),
  registerUser
);

// Login user
authRouter.post("/login", loginUser);

export default authRouter;
