import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    /**
     * You should find all the users, but do not find the currently loggedin users.You should find all the users, but do not find the currently loggedin users.
     * and fetch everything except the passwords.
     */
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Take id from req.params
    // Store it in a variable called userToChatId
    const { id: userToChatId } = req.params;
    // Identify current logged-in user
    // Compare users (sender vs receiver)
    // Save messages in DB
    const myId = req.user._id;  // ID of the currently logged-in user

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    /**
     * req.body → data sent from frontend
     * Extracts:
     * text → message content
     * image → optional image
     */
    const { text, image } = req.body;
    /**
     * req.params → values from URL
     * Renames id → receiverId
     * eg : /api/messages/123
     */
    const { id: receiverId } = req.params;
    /**
     * req.user → added by auth middleware
     * _id → logged-in user’s ID
     * Stored as senderId
     */
    const senderId = req.user._id;

    /**
     * Frontend sends:
     * - text + image (body)
     * - receiver ID (URL)
     * - token (auth)
     * Backend extracts:
     * - text, image → from body
     * - receiverId → from params
     * - senderId → from logged-in user
     */

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();  //store data in database and wait until it's completed

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage); //Message saved successfully, here is the data
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};