const Post = require('../models/Post'); // Adjust path if needed

// @desc    Get logged-in user's posts
// @route   GET /api/posts/myposts
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    // const posts = await Post.find({ postedBy: req.user.id })
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 }); // newest first

    res.json({ posts });
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getMyPosts };
