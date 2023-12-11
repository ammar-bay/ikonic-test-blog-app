import Post from "../models/Post";
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

// Create a post
export const createPost = async (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
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
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
