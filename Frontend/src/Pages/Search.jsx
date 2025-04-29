import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Siderbar from "../Components/Siderbar";
import Appbar from "../Components/Appbar";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/profile/search?q=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(res.data.users);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

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
        <Box sx={{ p: 1 }}>
          <TextField
            placeholder="Search users by username or bio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              style: { color: "white" },
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon sx={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "#1c1c1c",
              borderRadius: 2,
              mb: 4,
              input: { color: "white" },
            }}
          />

          {loading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : results.length > 0 ? (
            results.map((user) => (
              <Card
                key={user._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  background: "#1c2128",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#2c313a",
                  },
                }}
                onClick={() => navigate(`/user/${user._id}`)}
              >
                <Avatar
                  src={user.profilePic || "/images/default-avatar.png"}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {user.bio}
                  </Typography>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="#fff">
              No users found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
