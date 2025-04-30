// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Post = require("../models/Post");
// const User = require("../models/User");
// const { getMyPosts } = require("../controllers/postController");
// const { protect } = require("../middleware/postMiddleware");
// const cloudinary = require("../utils/cloudinary");
// const jwt = require("jsonwebtoken");

// // Middleware to verify token
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, "yourSuperSecretKey123");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({
//         message: "Unauthorized: Invalid or expired token",
//         error: error.message,
//       });
//   }
// };

// // Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Upload image/video to Cloudinary
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     cloudinary.uploader
//       .upload_stream({ resource_type: "auto" }, (error, result) => {
//         if (error)
//           return res
//             .status(500)
//             .json({ message: "Cloudinary upload failed", error });

//         res.status(200).json({ imageUrl: result.secure_url });
//       })
//       .end(req.file.buffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Create a Post
// router.post("/create", verifyToken, async (req, res) => {
//   console.log(req.body);
//   try {
//     const { image, caption, category, hashtags } = req.body;
//     const userId = req.user.id;

//     if (!userId || !image) {
//       return res
//         .status(400)
//         .json({ message: "User ID and image are required." });
//     }

//     const newPost = new Post({
//       user: userId,
//       image,
//       caption,
//       category,
//       hashtags,
//     });

//     await newPost.save();
//     res
//       .status(201)
//       .json({ message: "Post created successfully!", post: newPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Get all posts (for dashboard)
// router.get("/all", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("user", "username profilePic")
//       .populate("comments.user", "username profilePic") // <-- Add this line
//       .populate("user", "username profilePic")
//       .populate("comments.user", "username profilePic")
//       .populate("comments.replies.user", "username profilePic")
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Get logged-in user's posts
// router.get("/myposts", protect, getMyPosts);

// // Get posts by category
// router.get("/category/:categoryName", async (req, res) => {
//   try {
//     const category = req.params.categoryName;

//     const posts = await Post.find({ category })
//       .populate("user", "username profilePic")
//       .populate("comments.user", "username profilePic")
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error fetching category posts:", error);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// // Like a post
// router.put("/like/:id", verifyToken, async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $addToSet: { likes: req.user.id } }, // prevents duplicates
//       { new: true }
//     );
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Error liking post" });
//   }
// });

// // Unlike a post
// router.put("/unlike/:id", verifyToken, async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $pull: { likes: req.user.id } },
//       { new: true }
//     );
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Error unliking post" });
//   }
// });

// // Add a comment
// router.post("/comment/:id", verifyToken, async (req, res) => {
//   const { text } = req.body;
//   if (!text)
//     return res.status(400).json({ message: "Comment cannot be empty" });

//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: {
//           comments: {
//             user: req.user.id,
//             text,
//           },
//         },
//       },
//       { new: true }
//     )
//       .populate("user", "username profilePic")
//       .populate("comments.user", "username profilePic");

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Error adding comment" });
//   }
// });

// router.post(
//   "/comment/:postId/reply/:commentIndex",
//   verifyToken,
//   async (req, res) => {
//     const { postId, commentIndex } = req.params;
//     const { text } = req.body;

//     try {
//       const post = await Post.findById(postId);
//       if (!post) return res.status(404).json({ msg: "Post not found" });

//       const reply = {
//         user: req.user.id,
//         text,
//         createdAt: new Date(),
//       };

//       post.comments[commentIndex].replies.push(reply);
//       await post.save();

//       const updatedPost = await Post.findById(postId)
//         .populate("user", "username profilePic")
//         .populate("comments.user", "username profilePic")
//         .populate("comments.replies.user", "username profilePic");

//       res.json(updatedPost);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: "Server error" });
//     }
//   }
// );

// module.exports = router;

//***************************************************************************************************************************************** */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const { getMyPosts } = require("../controllers/postController");
const { protect } = require("../middleware/postMiddleware");
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
    const decoded = jwt.verify(token, "yourSuperSecretKey123");
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Unauthorized: Invalid or expired token",
        error: error.message,
      });
  }
};

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image/video to Cloudinary
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Cloudinary upload failed", error });

        res.status(200).json({ imageUrl: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Create a Post
router.post("/create", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const { image, caption, category, hashtags } = req.body;
    const userId = req.user.id;

    if (!userId || !image) {
      return res
        .status(400)
        .json({ message: "User ID and image are required." });
    }

    const newPost = new Post({
      user: userId,
      image,
      caption,
      category,
      hashtags,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
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
      .populate("comments.user", "username profilePic") // <-- Add this line
      .populate({
        path: "comments",
        populate: [
          { path: "user", select: "username profilePic" },
          {
            path: "replies",
            populate: { path: "user", select: "username profilePic" },
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Get logged-in user's posts
router.get("/myposts", protect, getMyPosts);

// Get posts by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const category = req.params.categoryName;

    const posts = await Post.find({ category })
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic")
      .populate({
        path: "comments",
        populate: [
          { path: "user", select: "username profilePic" },
          {
            path: "replies",
            populate: { path: "user", select: "username profilePic" },
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching category posts:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Like a post
router.put("/like/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user.id } }, // prevents duplicates
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error liking post" });
  }
});

// Unlike a post
router.put("/unlike/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user.id } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error unliking post" });
  }
});

// // Add a comment
// router.post("/comment/:id", verifyToken, async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

//   try {
//     const post = await Post.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: {
//           comments: {
//             user: req.user.id,
//             text
//           }
//         }
//       },
//       { new: true }
//     ).populate("user", "username profilePic")
//     .populate("comments.user", "username profilePic");

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: "Error adding comment" });
//   }
// });

router.post("/comment/:id", verifyToken, async (req, res) => {
  const { text } = req.body;
  if (!text)
    return res.status(400).json({ message: "Comment cannot be empty" });

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            user: req.user.id,
            text,
          },
        },
      },
      { new: true }
    )
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic")
      .populate({
        path: "comments",
        populate: [
          { path: "user", select: "username profilePic" },
          {
            path: "replies",
            populate: { path: "user", select: "username profilePic" },
          },
        ],
      });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

// POST /api/posts/comment/reply/:postId/:commentId
router.post(
  "/comment/reply/:postId/:commentId",
  verifyToken,
  async (req, res) => {
    const { text } = req.body;
    const { postId, commentId } = req.params;

    try {
      const post = await Post.findById(postId);
      const comment = post.comments.id(commentId);
      comment.replies.push({ text, user: req.user.id });
      await post.save();

      const updatedPost = await Post.findById(postId)
        .populate("user", "username profilePic")
        .populate({
          path: "comments",
          populate: [
            { path: "user", select: "username profilePic" },
            {
              path: "replies",
              populate: { path: "user", select: "username profilePic" },
            },
          ],
        });

      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// router.post(
//   "/comment/reply/:postId/:commentId",
//   verifyToken,
//   async (req, res) => {
//     const { postId, commentIndex } = req.params;
//     const { text } = req.body;

//     try {
//       const post = await Post.findById(postId);
//       if (!post) return res.status(404).json({ msg: "Post not found" });

//       const reply = {
//         user: req.user.id,
//         text,
//         createdAt: new Date(),
//       };

//       post.comments[commentIndex].replies.push(reply);
//       await post.save();

//       const updatedPost = await Post.findById(postId)
//         .populate("user", "username profilePic")
//         .populate("comments.user", "username profilePic")
//         .populate("comments.replies.user", "username profilePic");

//       res.json(updatedPost);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ msg: "Server error" });
//     }
//   }
// );

module.exports = router;
