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

// const Login = () => {
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

//         <Typography sx={{ color: "#fff", mt: 2 }}>Sign In</Typography>

//         <TextField
//           fullWidth
//           label="Email Address"
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
//           Sign In with Google
//         </Button>

//         <Typography sx={{ textAlign: "center", mt: 2, color: "#ccc" }}>
//           Don't have an account?{" "}
//           <Link
//             to="/signup" 
//             style={{
//               color: "#007bff",
//               cursor: "pointer",
//               textDecoration: "none",
//             }}
//           >
//             Sign Up
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Login;




import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//*****************Old handleLogin*****************  
  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/auth/login", formData);

  //     if (res.data?.message) {
  //       alert(res.data.message);
  //       navigate("/dashboard");
  //     } else {
  //       alert("Login successful");
  //       navigate("/dashboard");
  //     }
  //   } catch (err) {
  //     const message = err.response?.data?.message || "Login failed";
  //     alert(message);
  //   }
  // };

//******************New handleLogin*****************/
const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);
    localStorage.setItem("token", res.data.token);
    alert(res.data.message);
    navigate("/dashboard");
  } catch (err) {
    alert(err?.response?.data?.message || "Login failed");
  }
};

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('/images/space1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "cursive", textAlign: "center", color: "#fff" }}>
          CosmoConnect
        </Typography>

        <Typography sx={{ color: "#fff", mt: 2 }}>Sign In</Typography>

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            input: { color: "#fff" },
            fieldset: { borderColor: "rgba(255,255,255,0.5)" },
            "&:hover fieldset": { borderColor: "#fff" },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            input: { color: "#fff" },
            fieldset: { borderColor: "rgba(255,255,255,0.5)" },
            "&:hover fieldset": { borderColor: "#fff" },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,
            mb: 3,
            background: "linear-gradient(45deg, #007bff, #0056b3)",
            color: "#fff",
          }}
        >
          CONTINUE
        </Button>

        <Divider sx={{ my: 1, backgroundColor: "#fff" }}></Divider>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
            mb: 3,
            color: "#fff",
            borderColor: "rgba(255,255,255,0.5)",
            "&:hover": { borderColor: "#fff" },
          }}
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>

        <Typography sx={{ textAlign: "center", mt: 2, color: "#ccc" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
