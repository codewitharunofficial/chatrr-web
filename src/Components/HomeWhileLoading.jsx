import { Box } from "@mui/material";
import React from "react";

const HomeWhileLoading = () => {
  return (
    <Box
      component="div"
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 10,
        overflow: "scroll",
        scrollBehavior: "smooth"
      }}
    >
      <img src="./Icon.png" alt="Home" style={{ objectFit: "contain", width: "30%" }} />
      <h6>Loading...</h6>
      <progress color="lightblue" value={80} max={100} style={{marginBottom: 10, marginTop: 0}} />
        <p>As We're in Testing Mode, Our Server is on Free Instance. Please wait while we're  connecting to the server...</p>
    </Box>
  );
};

export default HomeWhileLoading;
