import express from "express";
import {
  getUsers,
  getUserByUsername,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";

const userRouter = express.Router();

// Get all users
userRouter.get("/", getUsers);

// Get user by username
userRouter.get("/:username", getUserByUsername);

// update user by id
userRouter.put("/:id", updateUserById);

// delete user by id
userRouter.delete("/:id", deleteUserById);

export default userRouter;
