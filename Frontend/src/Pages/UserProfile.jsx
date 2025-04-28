import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/user/${id}`
        );
        setUser(res.data.user);
        setPosts(res.data.posts);

        // Optional: check if logged-in user is already following this user
        // You can update this part later if needed
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/profile/follow",
        { userIdToFollow: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(true);
    } catch (err) {
      console.error("Failed to follow user", err);
    }
  };

  if (!user)
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>
    );

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
          opacity: 0.87,
          zIndex: -1,
        },
      }}
    >
      <Siderbar />
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <Appbar />

        <Card
          sx={{
            maxWidth: 1600,
            mx: "auto",
            background: "rgba(28, 33, 40, 0.9)",
            color: "#fff",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box sx={{ mt: 10, textAlign: "center" }}>
            <Avatar
              src={user?.profilePic || "/images/default-avatar.png"}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                border: "3px solid #1f6feb",
              }}
            />
            <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
              {user?.username}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "gray", mt: 1 }}
            >
              {user?.bio || "No bio added yet."}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleFollow}
              disabled={isFollowing}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Box sx={{ mx: 4, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {posts?.length || 0}
              </Typography>
              <Typography variant="body2" color="gray">
                Posts
              </Typography>
            </Box>
            {/* Optional: You can add followers/following counts */}
            <Box sx={{ mx: 4, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {user?.followers?.length || 0}
              </Typography>
              <Typography variant="body2" color="gray">
                Followers
              </Typography>
            </Box>
            <Box sx={{ mx: 4, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {user?.following?.length || 0}
              </Typography>
              <Typography variant="body2" color="gray">
                Following
              </Typography>
            </Box>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            sx={{ mt: 3, color: "#fff", borderBottom: "1px solid #30363d" }}
          >
            <Tab label="Posts" />
          </Tabs>

          <Box sx={{ width: "80%", mt: 3 }}>
            {tabValue === 0 && (
              <Grid container spacing={2} justifyContent="flex-start">
                {posts?.length > 0 ? (
                  posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          background: "#1c2128",
                          color: "#fff",
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={post.image}
                          alt="Post"
                          style={{
                            width: "100%",
                            height: 300,
                            objectFit: "cover",
                          }}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            {post.caption}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography color="gray" sx={{ textAlign: "center", mt: 3 }}>
                    No posts yet.
                  </Typography>
                )}
              </Grid>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default UserProfile;
