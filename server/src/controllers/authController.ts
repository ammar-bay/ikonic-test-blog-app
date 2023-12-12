import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role = "user" } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const accessToken = generateAccessToken({
      username: newUser.username,
      role: newUser.role,
    });
    const refereshToken = generateRefreshToken({
      username: newUser.username,
      role: newUser.role,
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refereshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Set the access token in the response JSON
    res.status(200).json({
      username,
      accessToken,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Please fill all fields" });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = generateAccessToken({
      username: user.username,
      role: user.role,
    });
    const refereshToken = generateRefreshToken({
      username: user.username,
      role: user.role,
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refereshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Set the access token in the response JSON
    res.status(200).json({
      username,
      accessToken,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "User not authenticated" });
  try {
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const username = (user as { username: string }).username;
    const accessToken = generateAccessToken(
      user as { username: string; role: string }
    );
    res.status(200).json({ accessToken, username });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
