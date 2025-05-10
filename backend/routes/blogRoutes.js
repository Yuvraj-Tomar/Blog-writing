import express from "express";
import { getBlogs, createBlog, uploadMiddleware, getBlogsByUser } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js";

const router = express.Router();

// Existing Routes
router.get("/", getBlogs);
router.post("/", protect, uploadMiddleware, createBlog);

// Latest blog route
router.get("/latest", async (req, res) => {
  try {
    const latestBlog = await Blog.findOne().sort({ createdAt: -1 });
    if (!latestBlog) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(latestBlog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest blog", error });
  }
});

// Update blog route with file upload support
router.put('/:id', protect, uploadMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

// DELETE blog route
router.delete('/:id', protect, async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id; // Get userId from the authenticated user

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Ensure the user deleting the blog is the owner
    if (blog.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
});

// User blogs route
router.get("/user/me", protect, getBlogsByUser);

export default router;