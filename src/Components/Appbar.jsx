import { faker } from "@faker-js/faker";
import { ChatBubbleOutline } from "@mui/icons-material";
import { AppBar, Avatar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(22, 27, 34, 0.9)" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton sx={{ color: "#fff", mr: 1 }}>
          <ChatBubbleOutline />
        </IconButton>
        <Link to={"/profile"}>
          <Avatar src={faker.image.avatar()} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
