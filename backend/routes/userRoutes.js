import express from "express";
import { 
  registerUser, 
  loginUser, 
  updateProfile,
  getProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadMiddleware } from "../controllers/blogController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, uploadMiddleware, updateProfile);
router.get("/profile", protect, getProfile);

export default router;