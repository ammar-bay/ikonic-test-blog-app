import User from "../models/User";
import { Request, Response } from "express";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// update user by id
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const { name, email, password } = req.body;
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
