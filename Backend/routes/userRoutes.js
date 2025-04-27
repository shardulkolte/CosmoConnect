const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const multer = require('multer');
const cloudinary = require("../utils/cloudinary");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

// Get current user profile
router.get("/profile/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password -googleId") // Don't send password or googleId
      .populate("followers", "username profilePic") // Optional: populate follower details
      .populate("following", "username profilePic");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile
router.put("/profile/update", verifyToken, async (req, res) => {
    try {
      const { username, bio, profilePic } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {
          username,
          bio,
          profilePic,
        },
        { new: true, runValidators: true }
      ).select("-password -googleId");
  
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error while updating profile" });
    }
  });
  



// Update profile including uploading profile picture
router.put("/profile/update", verifyToken, upload.single('profilePic'), async (req, res) => {
  try {
    let updateData = {
      username: req.body.username,
      bio: req.body.bio
    };

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "cosmoconnect/profilePics" },
        async (error, result) => {
          if (error) return res.status(500).json({ message: "Cloudinary upload error" });

          updateData.profilePic = result.secure_url;

          const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true }).select("-password -googleId");

          res.json(updatedUser);
        }
      );

      // Create stream
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(result);
    } else {
      // If no new file
      const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true }).select("-password -googleId");
      res.json(updatedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
