import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image or video.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cosmoconnect");
      formData.append("folder", "cosmoconnect_posts");

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dnggthvva/image/upload",
        formData
      );

      const imageUrl = cloudRes.data.secure_url;
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/posts/create",
        {
          image: imageUrl,
          caption,
          category,
          hashtags: hashtags.split(",").map((tag) => tag.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    } finally {
      setUploading(false);
    }
  };

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
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Appbar />
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            p: 3,
            background: "rgba(28, 33, 40, 0.9)",
            color: "#fff",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            Create New Post
          </Typography>
          <form onSubmit={handlePostSubmit}>
            <TextField
              label="Caption"
              fullWidth
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "white" }}>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                sx={{
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#22c55e",
                  },
                }}
              >
                <MenuItem value="Science and Space">Science and Space</MenuItem>
                <MenuItem value="Spiritual Cosmos">Spiritual Cosmos</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Hashtags (comma separated)"
              fullWidth
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2, backgroundColor: "#1f6feb" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleImageChange}
              />
            </Button>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ backgroundColor: "#22c55e" }}
              disabled={uploading}
            >
              {uploading ? "Posting..." : "Post"}
            </Button>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default CreatePost;
