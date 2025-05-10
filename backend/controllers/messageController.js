// controllers/messageController.js
import Message from "../models/Message.js";

// Controller to handle message submission
export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
};
