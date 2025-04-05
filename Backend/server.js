const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// // Protect Route Example test
// const authenticateToken = require("./middleware/authMiddleware");
// app.get("/api/protected", authenticateToken, (req, res) => {
//   res.json({ message: "Welcome to protected route!", user: req.user });
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
