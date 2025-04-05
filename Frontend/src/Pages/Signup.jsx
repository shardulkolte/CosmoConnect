// import React from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Divider,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         height: "100vh",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: `url('/images/space1.jpg')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "400px",
//           backgroundColor: "rgba(0, 0, 0, 0.8)",
//           padding: "30px",
//           borderRadius: "10px",
//           boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{ fontFamily: "cursive", textAlign: "center", color: "#fff" }}
//         >
//           CosmoConnect
//         </Typography>

//         <Typography sx={{ color: "#fff", mt: 2 }}>Sign Up</Typography>

//         <TextField
//           fullWidth
//           label="User Name"
//           variant="outlined"
//           margin="normal"
//           InputLabelProps={{ style: { color: "#fff" } }}
//           sx={{
//             input: { color: "#fff" },
//             fieldset: { borderColor: "rgba(255,255,255,0.5)" },
//             "&:hover fieldset": { borderColor: "#fff" },
//           }}
//         />
//         <TextField
//           fullWidth
//           label="Email Address"
//           type="password"
//           variant="outlined"
//           margin="normal"
//           InputLabelProps={{ style: { color: "#fff" } }}
//           sx={{
//             input: { color: "#fff" },
//             fieldset: { borderColor: "rgba(255,255,255,0.5)" },
//             "&:hover fieldset": { borderColor: "#fff" },
//           }}
//         />

//         <TextField
//           fullWidth
//           label="Password"
//           variant="outlined"
//           margin="normal"
//           InputLabelProps={{ style: { color: "#fff" } }}
//           sx={{
//             input: { color: "#fff" },
//             fieldset: { borderColor: "rgba(255,255,255,0.5)" },
//             "&:hover fieldset": { borderColor: "#fff" },
//           }}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 2,
//             mb: 3,
//             background: "linear-gradient(45deg, #007bff, #0056b3)",
//             color: "#fff",
//           }}
//         >
//           CONTINUE
//         </Button>

//         <Divider sx={{ my: 1, backgroundColor: "#fff" }}></Divider>

//         <Button
//           fullWidth
//           variant="outlined"
//           sx={{
//             mt: 2,
//             mb: 3,
//             color: "#fff",
//             borderColor: "rgba(255,255,255,0.5)",
//             "&:hover": { borderColor: "#fff" },
//           }}
//           startIcon={<GoogleIcon />}
//         >
//           Sign Up with Google
//         </Button>

//         <Typography sx={{ textAlign: "center", mt: 2, color: "#ccc" }}>
//           Already have an account ?{" "}
//           <Link
//             to="/" // Navigates to the Sign In page
//             style={{
//               color: "#007bff",
//               cursor: "pointer",
//               textDecoration: "none",
//             }}
//           >
//             Sign In
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Signup;





import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box, Divider
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Error signing up");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundImage: `url('/images/space1.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <Box sx={{ width: "400px", backgroundColor: "rgba(0, 0, 0, 0.8)", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)" }}>
        <Typography variant="h4" sx={{ fontFamily: "cursive", textAlign: "center", color: "#fff" }}>CosmoConnect</Typography>
        <Typography sx={{ color: "#fff", mt: 2 }}>Sign Up</Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="User Name" name="username" value={formData.username} onChange={handleChange} margin="normal" InputLabelProps={{ style: { color: "#fff" } }} sx={{ input: { color: "#fff" }, fieldset: { borderColor: "rgba(255,255,255,0.5)" }, "&:hover fieldset": { borderColor: "#fff" } }} />
          <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} margin="normal" InputLabelProps={{ style: { color: "#fff" } }} sx={{ input: { color: "#fff" }, fieldset: { borderColor: "rgba(255,255,255,0.5)" }, "&:hover fieldset": { borderColor: "#fff" } }} />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" InputLabelProps={{ style: { color: "#fff" } }} sx={{ input: { color: "#fff" }, fieldset: { borderColor: "rgba(255,255,255,0.5)" }, "&:hover fieldset": { borderColor: "#fff" } }} />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 3, background: "linear-gradient(45deg, #007bff, #0056b3)", color: "#fff" }}>CONTINUE</Button>
        </form>

        <Divider sx={{ my: 1, backgroundColor: "#fff" }} />
        <Button fullWidth variant="outlined" sx={{ mt: 2, mb: 3, color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff" } }} startIcon={<GoogleIcon />}>
          Sign Up with Google
        </Button>

        <Typography sx={{ textAlign: "center", mt: 2, color: "#ccc" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
