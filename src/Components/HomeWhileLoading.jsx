import { Box } from "@mui/material";
import React from "react";

const HomeWhileLoading = () => {
  return (
    <Box
      component="div"
      style={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <img src="./Icon.png" alt="Home" style={{ objectFit: "fill" }} />
      <progress color="lightblue" value={80} max={100}>
        Loading...
      </progress>
    </Box>
  );
};

export default HomeWhileLoading;
