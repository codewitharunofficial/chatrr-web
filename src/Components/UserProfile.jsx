import * as React from "react";
import UserDetailSection from "./UserDetailSection";
import { AccountCircle, CloseSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useUser } from "../Contexts/UserModelContext";

export default function UserProfile({user}) {
  const [isProfile, setIsProfile] = useUser(false);

  
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
          borderLeft: 'none'
        }}
      >
        <label style={{position: "absolute", top: -18, right: -15}} htmlFor="close">
        <IconButton sx={{":hover": {backgroundColor: "gray"}}} onClick={() => setIsProfile(!isProfile)} component="span">
        <CloseSharp fontSize={"18px"} sx={{":hover": {color: 'white'}}} />
        </IconButton>
      </label>
        
        <h6 className="text-center">{user?.name}</h6>
        <div
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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
        </div>
        <UserDetailSection field={"Phone"} value={user?.phone} />
        <UserDetailSection field={"Email"} value={user?.email} />
        <UserDetailSection
          field={"Bio"}
          value={user?.bio ? user?.bio : "I'm A Chatrr 😎"}
        />
      </div>
    </div>
  );
}
