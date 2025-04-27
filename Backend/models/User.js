// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String }, // Optional for Google-authenticated users
//   googleId: { type: String }, // Optional for Google users
//   profilePic: { type: String, default: "" }, // URL of profile picture
//   bio: { type: String, default: "" }, // Small bio/description
//   posts: [
//     {
//       image: { type: String }, // URL of the post image
//       caption: { type: String },
//       likes: { type: Number, default: 0 },
//       createdAt: { type: Date, default: Date.now },
//     }
//   ],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);




//***************************** */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google-authenticated users
  googleId: { type: String }, // Optional for Google users
  profilePic: { type: String, default: "" }, // URL of profile picture
  bio: { type: String, default: "" }, // Small bio/description
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
