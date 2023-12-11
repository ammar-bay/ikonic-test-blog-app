import express from "express";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";

const userRouter = express.Router();

// Get all users
userRouter.get("/", getUsers);

// Get user by id
userRouter.get("/:id", getUserById);

// update user by id
userRouter.put("/:id", updateUserById);

// delete user by id
userRouter.delete("/:id", deleteUserById);

export default userRouter;
