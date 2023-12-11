import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill all fields" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );
    const refereshToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      accessToken,
      refereshToken,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
