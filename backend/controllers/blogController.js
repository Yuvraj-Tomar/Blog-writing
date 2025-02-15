import Blog from "../models/Blog.js";
import multer from "multer";

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// POST a new blog with image
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

    const newBlog = new Blog({ title, content, author, imageUrl });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// Export multer middleware for routes
export const uploadMiddleware = upload.single("image");
