import React from "react";

const UserEditField = ({ field, defaultValue }) => {
  return (
    <input
      placeholder={`Enter Your ${field}`}
      type={field}
      defaultValue={defaultValue}
      autoFocus
      style={{
        minWidth: "60%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        gap: 20,
        justifyContent: "center",
        alignSelf: "center",
        paddingInline: 10,
        borderBottom: "1px solid gray",
        ":hover": { backgroundColor: "white" },
        borderRadius: 10
      }}
    />
  );
};

export default UserEditField;
