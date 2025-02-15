import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body; // Changed name to fullName
  console.log("Registration request received:", fullName, email);

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ fullName, email, password: hashedPassword });
    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", email);

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Please create an account, you don't have an account." });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password incorrect for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Login successful, Token generated for:", email);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login error", error });
  }
};
