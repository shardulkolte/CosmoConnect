import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { FavoriteBorder } from "@mui/icons-material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const tokenInStorage = localStorage.getItem("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      window.history.replaceState({}, document.title, "/dashboard");
      navigate("/dashboard"); // ✅ Navigate after token is set
    } else if (!tokenInStorage) {
      navigate("/"); // ✅ Redirect to login if token is missing
    }

    // ✅ If token exists in storage and URL is clean, do nothing
  }, [navigate]);


  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/images/space2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.87, // Adjust opacity (0.1 to 1)
          zIndex: -1,
        },
      }}
    >
      {/* Sidebar */}
      <Siderbar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* AppBar */}
        <Appbar />

        {/* Post Card */}
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            background: "rgba(28, 33, 40, 0.9)", // Semi-transparent effect
            color: "#fff",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {faker.person.firstName()}
              </Typography>
              <Typography variant="caption" color="gray">
                Devotional
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <img
              src="/images/post1.png"
              alt="Post"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
          <CardContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              From the void, creation emerged—just as ancient texts speak of
              divine sound birthing the universe.
            </Typography>
            <Typography variant="body2" color="primary">
              #DevotionalCosmos #BigBang #SpiritualScience
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <IconButton sx={{ color: "#1f6feb" }}>
                <FavoriteBorder />
              </IconButton>
              <Typography variant="body2">
                {faker.person.firstName()}, {faker.person.firstName()} &{" "}
                {Math.floor(Math.random() * 10)} others like this
              </Typography>
            </Box>
          </CardContent>

          {/* Comments Section */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Comments:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {faker.person.firstName()} {faker.person.lastName()}
                </Typography>
                <Typography variant="body2">
                  {faker.lorem.sentence()}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "#1f6feb", textTransform: "none" }}
                >
                  Reply
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Write a comment..."
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 20,
                    background: "#22272e",
                  },
                }}
              />
            </Box>
          </Box>
        </Card>
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            background: "rgba(28, 33, 40, 0.9)", // Semi-transparent effect
            color: "#fff",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {faker.person.firstName()}
              </Typography>
              <Typography variant="caption" color="gray">
                Devotional
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <img
              src="/images/post1.png"
              alt="Post"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
          <CardContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              From the void, creation emerged—just as ancient texts speak of
              divine sound birthing the universe.
            </Typography>
            <Typography variant="body2" color="primary">
              #DevotionalCosmos #BigBang #SpiritualScience
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <IconButton sx={{ color: "#1f6feb" }}>
                <FavoriteBorder />
              </IconButton>
              <Typography variant="body2">
                {faker.person.firstName()}, {faker.person.firstName()} &{" "}
                {Math.floor(Math.random() * 10)} others like this
              </Typography>
            </Box>
          </CardContent>

          {/* Comments Section */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Comments:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {faker.person.firstName()} {faker.person.lastName()}
                </Typography>
                <Typography variant="body2">
                  {faker.lorem.sentence()}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "#1f6feb", textTransform: "none" }}
                >
                  Reply
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Avatar sx={{ mr: 2 }} src={faker.image.avatar()} />
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Write a comment..."
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 20,
                    background: "#22272e",
                  },
                }}
              />
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;