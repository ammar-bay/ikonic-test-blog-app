import express from "express";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/postController";
const postRouter = express.Router();

// Get all posts
postRouter.get("/", getPosts);

// Create a post
postRouter.post("/", createPost);

// Get a specific post
postRouter.get("/:postId", getPost);

// Delete a specific post
postRouter.delete("/:postId", deletePost);

// Update a specific post
postRouter.patch("/:postId", updatePost);

export default postRouter;
