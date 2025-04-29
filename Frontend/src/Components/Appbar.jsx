import { faker } from "@faker-js/faker";
import { ChatBubbleOutline } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Appbar = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
      profilePic: "",
    });


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
            profilePic: profileRes.data.profilePic || "",
          });
  
        } catch (err) {
          console.error("Failed to fetch profile or posts:", err);
        }
      };
  
      fetchProfileAndPosts();
    }, []);
  return (
    <AppBar position="fixed" sx={{ background: "rgba(22, 27, 34, 0.9)" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton sx={{ color: "#fff", mr: 1 }}>
          <ChatBubbleOutline />
        </IconButton>
        <Link to={"/profile"}>
          <Avatar src={formData.profilePic || "/images/default-avatar.png"} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
