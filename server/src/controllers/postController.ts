import Post from "../models/Post";
import User from "../models/User";
import { Request, Response } from "express";

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Get all posts by username
export const getPostsByUsername = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Create a post
export const createPost = async (req: Request, res: Response) => {
  const { title, body, username, date } = req.body;
  if (!title || !body || !username || !date) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = new Post({
      title,
      body,
      userId: user._id,
      date,
    });

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Get a post
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const removedPost = await Post.deleteOne({ _id: req.params.postId });
    res.status(200).json(removedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  const { id, title, body } = req.body;
  console.log(req.body);
  try {
    const updatedPost = await Post.updateOne(
      { _id: id },
      { $set: { title, body } }
    );
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
