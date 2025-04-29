import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home,
  Search,
  Group,
  Settings,
  ExpandLess,
  ExpandMore,
  AddBoxOutlined,
  Logout,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: <Home />, text: "Home", path: "/dashboard" },
  { icon: <Search />, text: "Search", path: "/search" },
  {
    icon: <Group />,
    text: "Science & Space",path: "/science&space"
    // subItems: [
    //   { text: "AstroTech", path: "/community/astrotech" },
    //   { text: "CosmoPhysics", path: "/community/cosmophysics" },
    //   { text: "Alien Talk", path: "/community/alien-talk" },
    // ],
  },
  {
    icon: <Group />,
    text: "Spiritual Cosmos",path: "/spritualcosmos"
    // subItems: [
    //   { text: "Vedic Space", path: "/community/vedic-space" },
    //   { text: "MetaEnergy", path: "/community/metaenergy" },
    //   { text: "Karma & Cosmos", path: "/community/karma-cosmos" },
    // ],
  },
  { icon: <AddBoxOutlined />, text: "Create", path: "/createpost" },
  {
    icon: <Settings />,
    text: "Settings",
    subItems: [
      { text: "Profile", path: "/profile" },
      { text: "Privacy", path: "/settings/privacy" },
      { text: "Notifications", path: "/settings/notifications" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState({});
  const navigate = useNavigate();

  const handleToggle = (text) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 290,
          background: "rgba(22, 27, 34, 0.9)",
          color: "#fff",
          borderRight: "1px solid #30363d",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "cursive",
            fontWeight: "bold",
            color: "#fff",
            mb: 2,
            mt: 4,
          }}
        >
          <Link
            to="/dashboard"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "cursive",
            }}
          >
            CosmoConnect
          </Link>
        </Typography>
      </Toolbar>

      <List sx={{ mt: 2 }}>
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => {
                if (item.subItems) handleToggle(item.text);
              }}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#1f6feb" : "transparent",
                "&:hover": { backgroundColor: "#1f6feb" },
              }}
            >
              {item.path ? (
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  />
                </Link>
              ) : (
                <>
                  <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  />
                  {item.subItems &&
                    (openMenus[item.text] ? (
                      <ExpandLess sx={{ color: "#fff" }} />
                    ) : (
                      <ExpandMore sx={{ color: "#fff" }} />
                    ))}
                </>
              )}
            </ListItem>

            {item.subItems && (
              <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                <List sx={{ pl: 4 }}>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem
                      button
                      key={subIndex}
                      sx={{
                        backgroundColor:
                          location.pathname === subItem.path
                            ? "#1f6feb"
                            : "transparent",
                        "&:hover": { backgroundColor: "#1f6feb" },
                      }}
                    >
                      <Link
                        to={subItem.path}
                        style={{
                          display: "block",
                          width: "100%",
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        <ListItemText
                          primary={subItem.text}
                          primaryTypographyProps={{
                            fontSize: "1rem",
                          }}
                        />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}

        {/* Logout */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "#ff5555" },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
