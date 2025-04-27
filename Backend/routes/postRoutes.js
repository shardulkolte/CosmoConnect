// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Post = require("../models/Post");
// const User = require("../models/User");
// const cloudinary = require("../utils/cloudinary");

// // Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// // Upload image/video to Cloudinary
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
//       if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

//       res.status(200).json({ imageUrl: result.secure_url });
//     }).end(req.file.buffer);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Create a Post
// router.post("/create", async (req, res) => {
//     console.log(req.body);
//   try {
//     const { userId, image, caption, category, hashtags } = req.body;

//     if (!userId || !image) {
//       return res.status(400).json({ message: "User ID and image are required." });
//     }

//     const newPost = new Post({
//       user: userId,
//       image,
//       caption,
//       category,
//       hashtags
//     });

//     await newPost.save();
//     res.status(201).json({ message: "Post created successfully!", post: newPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Get all posts (for dashboard)
// router.get("/all", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("user", "username profilePic") // Populate user fields
//       .sort({ createdAt: -1 }); // Newest first

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// module.exports = router;


//********************************************************************************************************* */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "yourSuperSecretKey123"); // 👈 replace with your JWT secret
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token", error: error.message });
  }
};

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image/video to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

      res.status(200).json({ imageUrl: result.secure_url });
    }).end(req.file.buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Create a Post
router.post("/create", verifyToken, async (req, res) => { // 👈 Add verifyToken middleware
  console.log(req.body);
  try {
    const { image, caption, category, hashtags } = req.body;
    const userId = req.user.id; // 👈 Extract userId from decoded token

    if (!userId || !image) {
      return res.status(400).json({ message: "User ID and image are required." });
    }

    const newPost = new Post({
      user: userId,
      image,
      caption,
      category,
      hashtags
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Get all posts (for dashboard)
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
