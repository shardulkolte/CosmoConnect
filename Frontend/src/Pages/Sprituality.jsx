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

const Sprituality = () => {
  const [posts, setPosts] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/category/Spiritual Cosmos"
      );
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to load Science and Space posts", error);
    }
  };

  const fetchCurrentUserProfile = async () => {
    try {
      const profileRes = await axios.get(
        "http://localhost:5000/api/profile/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCurrentUser(profileRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const text = commentText[postId];
    if (!text) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/comment/${postId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data : post))
      );
      setCommentText({ ...commentText, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleLikeToggle = async (postId, liked) => {
    try {
      const url = `http://localhost:5000/api/posts/${
        liked ? "unlike" : "like"
      }/${postId}`;
      const res = await axios.put(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data : post))
      );
      fetchPosts();
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUserProfile();
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
              {currentuser && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <IconButton
                    sx={{
                      color: post.likes?.includes(currentuser._id)
                        ? "red"
                        : "#1f6feb",
                    }}
                    onClick={() =>
                      handleLikeToggle(
                        post._id,
                        post.likes?.includes(currentuser._id)
                      )
                    }
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <Typography variant="body2">
                    {post.likes?.length || 0} likes
                  </Typography>
                </Box>
              )}
              <Box
                component="form"
                onSubmit={(e) => handleCommentSubmit(e, post._id)}
                sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#2b3137",
                    color: "white",
                    border: "1px solid #444",
                    borderRadius: "20px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#1f6feb",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  Post
                </button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Sprituality;
