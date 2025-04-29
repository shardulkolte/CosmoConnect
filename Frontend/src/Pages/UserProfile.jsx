import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import { toast } from "react-toastify";

const OtherUserProfile = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const [currentuser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      setPosts(res.data.posts);
      setIsFollowing(res.data.isFollowing);
    } catch (error) {
      console.error(error);
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

  //new handlefollowtoggle

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.put(
          `http://localhost:5000/api/profile/unfollow/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.info("Unfollowed user");

        setIsFollowing(false);
      } else {
        await axios.put(
          `http://localhost:5000/api/profile/follow/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Followed user");

        setIsFollowing(true);
      }

      // Refresh user data to update follower counts
      fetchProfile();
    } catch (error) {
      console.error(error);
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchCurrentUserProfile();
    fetchProfile();
  }, [id]);

  if (!user) {
    return (
      <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>
    );
  }

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
              src={user.profilePic || "/images/default-avatar.png"}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                border: "3px solid #1f6feb",
              }}
            />
            <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
              {user.username}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "gray", mt: 1 }}
            >
              {user.bio || "No bio added yet."}
            </Typography>

            {user._id !== currentuser?._id && (
              <Button
                variant={isFollowing ? "contained" : "outlined"}
                onClick={handleFollowToggle}
                sx={{ mt: 2 }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
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
            onChange={(e, newValue) => setTabValue(newValue)}
            textColor="inherit"
            indicatorColor="primary"
            sx={{ mt: 3, color: "#fff", borderBottom: "1px solid #30363d" }}
          >
            <Tab label="Posts" />
            <Tab label="Followers" />
            <Tab label="Following" />
          </Tabs>

          <Box sx={{ width: "80%", mt: 3 }}>
            {tabValue === 0 && (
              <Grid container spacing={7} justifyContent="flex-start" ml={10}>
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

            {tabValue === 1 && (
              <Box sx={{ mt: 3 }}>
                {user?.followers?.length === 0 ? (
                  <Typography color="gray" textAlign="center">
                    No followers yet.
                  </Typography>
                ) : (
                  user.followers.map((follower) => (
                    <Box
                      key={follower._id}
                      onClick={() =>
                        (window.location.href = `/user/${follower._id}`)
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        cursor: "pointer",
                        p: 1,
                        "&:hover": { background: "#2c2f36", borderRadius: 2 },
                      }}
                    >
                      <Avatar src={follower.profilePic} />
                      <Typography>{follower.username}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}

            {tabValue === 2 && (
              <Box sx={{ mt: 3 }}>
                {user?.following?.length === 0 ? (
                  <Typography color="gray" textAlign="center">
                    Not following anyone.
                  </Typography>
                ) : (
                  user.following.map((followed) => (
                    <Box
                      key={followed._id}
                      onClick={() =>
                        (window.location.href = `/user/${followed._id}`)
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        cursor: "pointer",
                        p: 1,
                        "&:hover": { background: "#2c2f36", borderRadius: 2 },
                      }}
                    >
                      <Avatar src={followed.profilePic} />
                      <Typography>{followed.username}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default OtherUserProfile;
