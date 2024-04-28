import {
  AccountCircle,
  CameraAltRounded,
  Edit,
  Save,
} from "@mui/icons-material";
import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailSection from "./UserDetailSection";
import UserEditField from "./UserEditField";
import { Fab, IconButton } from "@mui/material";
import { userFields } from "../Constants/Fields";

function Profile() {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const navigator = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (!user) {
      alert("You're Not Logged In, Please Login To See Profile");
      navigator("/login");
    }
  });

  const handleFileChange = (e) => {
    console.log(e);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 200,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "purple",
        }}
      >
        {user?.photo ? (
          <img
            src={user?.photo?.secure_url}
            alt={user?.name}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              border: "1px solid gray",
            }}
          />
        ) : (
          <AccountCircle style={{ fontSize: 100, color: "lightgray" }} />
        )}

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          id="fileInput"
        />
        <label
          style={{
            position: "absolute",
            top: 185,
            left: "16%",
          }}
          htmlFor="fileInput"
        >
          <IconButton
            sx={{ ":hover": { backgroundColor: "black" }, color: "white" }}
            component="span"
          >
            <CameraAltRounded />
          </IconButton>
        </label>
      </div>
      <div
        style={{
          width: "100%",
          height: "45vh",
          backgroundColor: "lightgreen",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {isEditing
          ? userFields.map((field) => (
              <UserEditField
                key={field._id}
                field={field.name}
                defaultValue={field.info}
              />
            ))
          : userFields.map((field) => (
              <UserDetailSection
                key={field._id}
                field={field.name}
                value={field?.info}
              />
            ))}
        {isEditing ? (
          <Fab onClick={() => setIsEditing(!isEditing)}
          style={{alignSelf: "center"}}
            // sx={{ ":hover": { backgroundColor: "green" } }}
            color="success"
          >
            <Save />
          </Fab>
        ) : (
           <Fab onClick={() => setIsEditing(!isEditing)}
            style={{alignSelf: "center"}}
            color="primary"
          >
            <Edit />
          </Fab>
        )}
      </div>
    </div>
  );
}

export default Profile;
