// routes/messageRoutes.js
import express from "express";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// Route for submitting a message
router.post("/send", sendMessage);

export default router;
