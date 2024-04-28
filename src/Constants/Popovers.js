import { Popover } from "@mui/material";
import React from "react";

const [anchorEl, setAnchorEl] = React.useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  export const About = ({ icon }) => (
    <Popover
      id={icon}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <div style={{ padding: "10px" }}>{icon}</div>
    </Popover>
  );