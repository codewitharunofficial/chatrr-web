import { AccountCircle, CameraAltRounded } from "@mui/icons-material";
import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailSection from "./UserDetailSection";
import UserEditField from "./UserEditField";
import { IconButton } from "@mui/material";

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
  }

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
        style={{
          width: "70%",
          height: "70%",
          backgroundColor: "lightblue",
          border: "2px solid gray",
          boxShadow: "4,,-6, 6, -4",
          borderRadius: 20,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h4 className="text-center">User Profile</h4>
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
          {user?.photo ? (
            <img
              src={user?.photo?.secure_url}
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
          
          <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id="fileInput"
      />
      <label style={{
              position: "absolute",
              top: 225,
              right: "47%",
            }} htmlFor="fileInput">
        <IconButton component="span">
        <CameraAltRounded />
        </IconButton>
      </label>
        </div>
        {
          isEditing ? (
        <UserEditField field={"Name"} defaultValue={user?.name} />
          ) : (
        <UserDetailSection field={"Name"} value={user?.name} />
          )
        }
        <UserDetailSection field={"Phone"} value={user?.phone} />
        <UserDetailSection field={"Email"} value={user?.email} />
        <UserDetailSection field={"Bio"} value={user?.bio ? user?.bio : "I'm A Chatrr 😎"} />
        {
          isEditing ? (
        <button className="btn btn-success text-center" style={{width: '20%', padding: 10, color: 'white', borderRadius: 30, alignSelf: 'center'}} onClick={() => {setIsEditing(!isEditing)}} type="edit" >Save Changes</button>
          ) : (
            <button className="btn btn-primary text-center" style={{width: '20%', padding: 10, color: 'white', borderRadius: 30, alignSelf: 'center'}} onClick={() => {setIsEditing(!isEditing)}} type="edit" >Edit</button>
          )
        }
      </div>
    </div>
  );
}

export default Profile;
