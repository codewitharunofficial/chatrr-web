import React from "react";

const Messages = ({message}) => {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  return (
    <p
      key={message?._id}
      style={{
        backgroundColor: user?._id === message?.sender ? "gray" : "purple",
        alignSelf: user?._id === message?.sender ? "flex-end" : "flex-start",
        maxWidth: "40%",
        padding: 10,
        borderRadius: 10,
      }}
    >
      {message?.message?.message}
    </p>
  );
};

export default Messages;
