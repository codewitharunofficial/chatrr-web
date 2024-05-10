import {
  ArrowBack,
  Phone,
  VideoCallOutlined,
  VideoChat,
  VideoChatOutlined,
} from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentChat } from "../Contexts/CurrentChatContext";
import { useUser } from "../Contexts/UserModelContext";
import { Backdrop, IconButton, Popover } from "@mui/material";

const ConvoTopBar = ({ profilePic, name, lastseen, user }) => {
  const navigation = useNavigate();
  const [currentChat, setCurrentChat] = useCurrentChat();
  const [isProfile, setIsProfile] = useUser(false);
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);



  return (
    <div
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "lightblue",
        alignItems: "center",
        paddingY: 10,
        marginBottom: 20,
        marginTop: -65,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: 10,
      }}
    >
      <IconButton onClick={() => setCurrentChat([])} sx={{":hover": {backgroundColor: 'white'}}} >
      <ArrowBack />
      </IconButton>
      <img
        src={profilePic}
        alt={name}
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          border: "2px solid white",
        }}
      />
      <div
        onClick={() => setIsProfile(true)}
        style={{
          height: 50,
          alignSelf: "center",
          paddingY: 5,
          flex: 0.98,
          marginTop: 10,
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {currentChat?.length > 0 ? (
          <>
            <h6 style={{ textAlign: "center" }}>{name}</h6>
            <p
              style={{
                textAlign: "center",
                color: lastseen === true ? "green" : "white",
                fontSize: 14,
              }}
            >
              {lastseen}
            </p>
          </>
        ) : (
          <h6 style={{ textAlign: "center" }}>Coversation</h6>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Phone
            style={{ cursor: "pointer" }}
            sx={{ ":hover": { color: "white" } }}
          />
        </IconButton>
        <IconButton
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <VideoChatOutlined
            style={{ cursor: "pointer" }}
            sx={{ ":hover": { color: "white" } }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ConvoTopBar;
