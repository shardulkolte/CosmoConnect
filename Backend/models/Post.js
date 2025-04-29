// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   image: { type: String, required: true }, // Image/Video URL
//   caption: { type: String },
//   category: { type: String },
//   hashtags: [{ type: String }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Post", PostSchema);


//******************************************************************************* */

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, required: true },
  caption: { type: String },
  category: { type: String },
  hashtags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // New
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ], // New
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
