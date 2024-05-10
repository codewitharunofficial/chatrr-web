import React from "react";

const Messages = ({message, key}) => {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  return (
    <p
      key={key}
      style={{
        backgroundColor: user?._id === message?.sender ? "gray" : "lightskyblue",
        alignSelf: user?._id === message?.sender ? "flex-end" : "flex-start",
        maxWidth: "80%",
        padding: 10,
        borderRadius: 10,
        color: "white"
      }}
    >
      {message?.message?.message}
    </p>
  );
};

export default Messages;
