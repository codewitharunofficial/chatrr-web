import { AccountCircle, Chat, WebStoriesOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTabs } from "../../Contexts/For Small Devices/Tabs";

const Navbar = () => {

  const [profileFocus, setProfileFocus] = React.useState(false);
  const [storiesFocus, setStoriesFocus] = React.useState(false);
  const [focusHomeTab, setFocusHomeTab] = useTabs();


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
        onClick={() => {setFocusHomeTab(true); setProfileFocus(false);}}
        sx={{
          ":hover": { backgroundColor: "lightblue", borderRadius: 0 },
          backgroundColor: focusHomeTab ? "lightblue" : "purple",
          borderRadius: 0,
        }}
      >
        <NavLink to='/' >
        <Chat style={{ fontSize: 40, color: "white" }} />
        </NavLink>
      </IconButton>
      <NavLink to='/profile' >
      <IconButton
        onClick={() => {
          setFocusHomeTab(false);
          setStoriesFocus(false);
          setProfileFocus(true);
        }}
        sx={{ ":hover": { backgroundColor: "lightblue", borderRadius: 0 }, backgroundColor: profileFocus ? "lightblue" : "purple",
        borderRadius: 0, }}
      >

        <AccountCircle
          style={{ fontSize: 40, color: "white" }}
          sx={{ ":focus": { color: "lightblue" } }}
        />
      </IconButton>
        </NavLink>

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
