import { AccountCircle, Chat, WebStoriesOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        width: "100%",
        height: "8%",
        backgroundColor: "purple",
        position: "fixed",
        bottom: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton
        sx={{ ":focus": { backgroundColor: "lightblue", borderRadius: 0 } }}
      >
        <Chat style={{ fontSize: 40, color: "white" }} />
      </IconButton>
      <IconButton
        sx={{ ":focus": { backgroundColor: "lightblue", borderRadius: 0 } }}
      >
        <AccountCircle
          style={{ fontSize: 40, color: "white" }}
          sx={{ ":focus": { color: "lightblue" } }}
        />
      </IconButton>

      <IconButton
        sx={{ ":focus": { backgroundColor: "lightblue", borderRadius: 0 } }}
      >
        <WebStoriesOutlined
          style={{ fontSize: 40, color: "white" }}
          sx={{ ":focus": { color: "lightblue" } }}
        />
      </IconButton>
    </nav>
  );
};

export default Navbar;
