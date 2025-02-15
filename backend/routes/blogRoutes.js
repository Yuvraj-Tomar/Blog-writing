import express from "express";
import { getBlogs, createBlog, uploadMiddleware } from "../controllers/blogController.js";
import Blog from "../models/Blog.js"; // Import the Blog model

const router = express.Router();

// Existing Routes
router.get("/", getBlogs); // Fetch all blogs
router.post("/", uploadMiddleware, createBlog); // Create a new blog with image upload

// New Route: Fetch the latest blog
router.get("/latest", async (req, res) => {
  try {
    const latestBlog = await Blog.findOne().sort({ createdAt: -1 }); // Fetch the most recent blog
    if (!latestBlog) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(latestBlog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest blog", error });
  }
});

export default router;