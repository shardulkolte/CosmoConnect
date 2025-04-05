import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { Edit, FavoriteBorder } from "@mui/icons-material";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userPosts = Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos(),
    caption: faker.lorem.sentence(),
    likes: Math.floor(Math.random() * 200),
  }));
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
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        {/* AppBar */}
        <Appbar />

        {/* Post Card */}
        <Card
                  sx={{
                    maxWidth:1600,
                    mx: "auto",
                    background: "rgba(28, 33, 40, 0.9)", // Semi-transparent effect
                    color: "#fff",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
        <Box sx={{ mt: 10, textAlign: "center", color: "#fff" }}>
          <Avatar
            src={faker.image.avatar()}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              border: "3px solid #1f6feb",
            }}
          />
          <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
            {faker.person.fullName()}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "gray", mt: 1 }}
          >
            {faker.lorem.sentence()}
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
          >
            Edit Profile
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Box sx={{ mx: 4, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              {Math.floor(Math.random() * 1000)}
            </Typography>
            <Typography variant="body2" color="gray">
              Posts
            </Typography>
          </Box>
          <Box sx={{ mx: 4, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              {Math.floor(Math.random() * 5000)}
            </Typography>
            <Typography variant="body2" color="gray">
              Followers
            </Typography>
          </Box>
          <Box sx={{ mx: 4, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              {Math.floor(Math.random() * 3000)}
            </Typography>
            <Typography variant="body2" color="gray">
              Following
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
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

        {/* Tab Content */}
        <Box sx={{ width: "80%", mt: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3} justifyContent="center">
              {userPosts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: "#1c2128",
                      color: "#fff",
                      borderRadius: 3,
                    }}
                  >
                    <img
                      src={post.image}
                      alt="Post"
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                    <CardContent>
                      <Typography variant="body2">{post.caption}</Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        {post.likes} Likes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
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
