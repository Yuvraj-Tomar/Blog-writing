import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import multer from "multer";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js"; // Import DB connection function
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js"; // Import User model
import Blog from "./models/Blog.js"; // Import Blog model

dotenv.config();
connectDB(); // Establish database connection

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to create a blog post with image upload
app.post("/api/blogs", upload.single("image"), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newBlog = new Blog({ title, content, author, imageUrl });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample Route
app.get("/", (req, res) => {
  res.send("Blog Writing API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
