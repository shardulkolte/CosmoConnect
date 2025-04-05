// const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");
// require("./config/passport"); // 👈 this should be ABOVE passport.use()
// require("dotenv").config();
// const passport = require("passport");
// const session = require("express-session");


// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // DB connection
// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));

// // Protect Route Example test
// const authenticateToken = require("./middleware/authMiddleware");
// app.get("/api/protected", authenticateToken, (req, res) => {
//   res.json({ message: "Welcome to protected route!", user: req.user });
// });

// //catching error
// app.use((err, req, res, next) => {
//   console.error("Unexpected Error:", err);
//   res
//     .status(500)
//     .json({ message: "Internal Server Error", error: err.message });
// });

// //sign in with google

// app.use(
//   session({ secret: "cosmosecret", resave: false, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport"); // make sure this is below `require("passport")` and AFTER env

const app = express();

// ✅ Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Express Session Middleware (must be before routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cosmosecret",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ Protect Route Example
const authenticateToken = require("./middleware/authMiddleware");
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to protected route!", user: req.user });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
