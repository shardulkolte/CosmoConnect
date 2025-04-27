

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
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import { toast } from "react-toastify";

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profilePic: "",
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found!");
          return;
        }

        // Fetch profile
        const profileRes = await axios.get(
          "http://localhost:5000/api/profile/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(profileRes.data);

        setFormData({
          username: profileRes.data.username || "",
          bio: profileRes.data.bio || "",
          profilePic: profileRes.data.profilePic || "",
        });

        // Fetch user's posts
        const postsRes = await axios.get(
          "http://localhost:5000/api/posts/myposts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(postsRes.data.posts || []);
      } catch (err) {
        console.error("Failed to fetch profile or posts:", err);
      }
    };

    fetchProfileAndPosts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "cosmoconnect"); // Change if needed
    data.append("cloud_name", "dnggthvva"); // Change if needed

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnggthvva/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await res.json();
      return cloudData.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoadingUpdate(true);
      const token = localStorage.getItem("token");

      let imageUrl = formData.profilePic;
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        { ...formData, profilePic: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoadingUpdate(false);
    }
  };

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
              src={formData.profilePic || "/images/default-avatar.png"}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                border: "3px solid #1f6feb",
              }}
            />
            {editMode ? (
              <>
                <TextField
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <TextField
                  name="bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mt: 2 }}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2, color: "#1f6feb", borderColor: "#1f6feb" }}
                >
                  Upload Profile Pic
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleUpdateProfile}
                  disabled={loadingUpdate}
                >
                  {loadingUpdate ? "Updating..." : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, ml: 2 }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
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
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{
                    mt: 2,
                    color: "#1f6feb",
                    borderColor: "#1f6feb",
                    "&:hover": { borderColor: "#fff" },
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              </>
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
            onChange={handleChange}
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
                          {/* <Typography
                            variant="body2"
                            color="primary"
                            // sx={{ mt: 1 }}
                          >
                            {post.likes.length} Likes
                          </Typography> */}
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
              <Typography color="gray" sx={{ textAlign: "center", mt: 3 }}>
                Followers list feature coming soon...
              </Typography>
            )}

            {tabValue === 2 && (
              <Typography color="gray" sx={{ textAlign: "center", mt: 3 }}>
                Following list feature coming soon...
              </Typography>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
