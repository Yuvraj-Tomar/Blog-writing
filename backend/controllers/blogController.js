import Blog from "../models/Blog.js";
import multer from "multer";

// Multer Storage Setup (No changes needed here)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all blogs (No changes needed here)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// POST a new blog with image and userId
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const userId = req.user.id; // Get userId from the authenticated user

    const newBlog = new Blog({ title, content, author, imageUrl, userId });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// GET blogs by user ID
export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from the authenticated user
    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 }); // Fetch blogs for the specific user, newest first
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's blogs", error });
  }
};

// Export multer middleware for routes (No changes needed here)
export const uploadMiddleware = upload.single("image");