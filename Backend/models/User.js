const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google-authenticated users
  googleId: { type: String }, // To store Google user ID
});

module.exports = mongoose.model("User", UserSchema);
