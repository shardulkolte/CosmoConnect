import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const tokenInStorage = localStorage.getItem("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      window.history.replaceState({}, document.title, "/dashboard");
      navigate("/dashboard");
    } else if (!tokenInStorage) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/all");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to load posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fixed Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/images/space2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Sidebar */}
      <Siderbar />

      {/* Scrollable Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "100vh",
          p: 3,
          mt: 8,
        }}
      >
        <Appbar />

        {/* All Posts */}
        {posts.map((post) => (
          <Card
            key={post._id}
            sx={{
              maxWidth: 600,
              mx: "auto",
              mt: 4,
              background: "rgba(28, 33, 40, 0.9)",
              color: "#fff",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Avatar sx={{ mr: 2 }} src={post.user?.profilePic} /> */}
              <Avatar
                sx={{ mr: 2, cursor: "pointer" }}
                src={post.user?.profilePic}
                onClick={() => navigate(`/user/${post.user?._id}`)}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {post.user?.username}
                </Typography>
                <Typography variant="caption" color="gray">
                  {post.category}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <img
                src={post.image}
                alt="Post"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {post.caption}
              </Typography>
              <Typography variant="body2" color="primary">
                {post.hashtags.map((tag, index) => (
                  <span key={index}>#{tag} </span>
                ))}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <IconButton sx={{ color: "#1f6feb" }}>
                  <FavoriteBorder />
                </IconButton>
                <Typography variant="body2">0 likes</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
