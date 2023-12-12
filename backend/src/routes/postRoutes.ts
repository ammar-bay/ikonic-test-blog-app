import express from "express";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostsByUsername,
} from "../controllers/postController";
const postRouter = express.Router();

// Get all posts
postRouter.get("/", getPosts);

// Get all posts by username
postRouter.get("/:username", getPostsByUsername);

// Create a post
postRouter.post("/", createPost);

// Get a specific post
postRouter.get("/:postId", getPost);

// Delete a specific post
postRouter.delete("/:postId", deletePost);

// Update a specific post
postRouter.patch("/", updatePost);

export default postRouter;
