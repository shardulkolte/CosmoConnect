
const express = require("express");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/authController");

router.post("/signup", signupUser); // ✅ make sure signupUser is correctly defined and imported
router.post("/login", loginUser);   // ✅ same for loginUser

module.exports = router;