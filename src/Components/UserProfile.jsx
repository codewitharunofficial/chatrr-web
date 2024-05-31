import * as React from "react";
import UserDetailSection from "./UserDetailSection";
import { AccountCircle, CloseSharp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useUser } from "../Contexts/UserModelContext";

export default function UserProfile({ user, setIsProfile }) {

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="profile"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "lightblue",
          border: "1px solid gray",
          boxShadow: "4,,-6, 6, -4",
          borderRadius: 20,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderLeft: "none",
        }}
      >
        <Box
          component={"div"}
          sx={{
            height: 40,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            paddingInline: 2,
          }}
        >
          <IconButton
            sx={{
              ":hover": { backgroundColor: "lightgreen" },
              flex: 0.05,
              alignSelf: "flex-start",
            }}
            onClick={() => setIsProfile(false)}
            component="span"
          >
            <CloseSharp
              fontSize={"18px"}
              sx={{ ":hover": { color: "" }, color: "white" }}
            />
          </IconButton>
        </Box>
        <div
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 30,
          }}
        >
          {user?.profilePhoto ? (
            <img
              src={user?.profilePhoto?.secure_url}
              alt={user?.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                border: "1px solid gray",
              }}
            />
          ) : (
            <AccountCircle style={{ fontSize: 100, color: "lightgray" }} />
          )}
          <h5
            style={{
              textDecoration: "underline",
              paddingInline: 10,
              color: "teal",
            }}
          >
            {user?.name}
          </h5>
        </div>
        <UserDetailSection
          field={"About"}
          value={user?.bio ? user?.bio : "I'm A Chatrr 😎"}
        />
        <UserDetailSection field={"Phone"} value={user?.phone} />
        <UserDetailSection field={"Email"} value={user?.email} />
      </div>
    </div>
  );
}
