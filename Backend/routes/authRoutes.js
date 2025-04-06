// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// const { loginUser, signupUser } = require("../controllers/authController");

// router.post("/signup", signupUser); // ✅ make sure signupUser is correctly defined and imported
// router.post("/login", loginUser);   // ✅ same for loginUser

// //sign up with google
// // Start Google Auth
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Callback route
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "http://localhost:3000",session:false }),
//     (req, res) => {
//       const user = req.user;

//       if (!user) {
//         return res.redirect("http://localhost:3000?error=GoogleAuthFailed");
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       console.log("Redirecting with token:", token);
  
//       // Redirect to React frontend with token as query param
//       res.redirect(`http://localhost:3000/dashboard?token=${token}`);
//     }
//   );

// module.exports = router;


//************************************************************************************************************************************** */

const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { loginUser, signupUser } = require("../controllers/authController");

router.post("/signup", signupUser); // ✅ make sure signupUser is correctly defined and imported
router.post("/login", loginUser);   // ✅ same for loginUser

//sign up with google
// Start Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
    (req, res) => {
      const user = req.user;
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // Redirect to React frontend with token as query param
      res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    }
  );

module.exports = router;