const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = router;
