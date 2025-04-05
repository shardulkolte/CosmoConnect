const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: existingUser._id, email: existingUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signupUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
  
      await newUser.save();
  
      // Check for missing secret
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET not defined in .env");
        return res.status(500).json({ message: "Server misconfiguration" });
      }
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error" });
    }
    console.log("Creating user:", { username, email });
console.log("JWT_SECRET:", process.env.JWT_SECRET);
  };
  