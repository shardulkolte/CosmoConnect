const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const multer = require('multer');
const cloudinary = require("../utils/cloudinary");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { authenticateUser } = require('../middleware/authMiddleware');

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

    res.json({
      _id: user._id, // <-- ✅ This gives you the current user's ID
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio:user.bio,
      followers: user.followers,
      following: user.following,
    });
    // 
    
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


// Fetch any user's profile by ID
router.get("/profile/user/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    const isFollowing = user.followers.includes(currentUserId);

    res.json({ user, posts, isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});



// follow a user
router.put('/profile/follow/:id', authenticateUser, async (req, res) => {
  try {
    const userToFollowId = req.params.id;
    const currentUserId = req.user.id;

    if (currentUserId === userToFollowId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(userToFollowId);

      await userToFollow.save();
      await currentUser.save();

      return res.status(200).json({ message: "User followed successfully." });
    } else {
      return res.status(400).json({ message: "Already following this user." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
});

// unfollow a user
router.put('/profile/unfollow/:id', authenticateUser, async (req, res) => {
  try {
    const userToUnfollowId = req.params.id;
    const currentUserId = req.user.id;

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollowId
    );

    await userToUnfollow.save();
    await currentUser.save();

    return res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
});



module.exports = router;
