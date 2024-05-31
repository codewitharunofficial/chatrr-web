import moment from "moment";
import React from "react";

const Messages = ({ message, key, messageTime }) => {
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  return (
    <div
      key={key}
      style={{
        width: "98%",
        display: "flex",
        flexDirection: user?._id === message?.sender ? "row-reverse" : "row",
        padding: 3,
        borderRadius: 10,
        margin: 3,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: user?._id === message?.sender ? "flex-end" : "flex-start",
          backgroundColor:
          user?._id === message?.sender ? "gray" : "lightskyblue",
          maxWidth: "80%",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <p
          style={{
            color: "white",
          }}
        >
          {message?.message?.message}
        </p>
        <small style={{color: user?._id === message?.sender ? "lightgreen" : "gray", fontSize: 8, alignSelf: "end", marginTop: 2 }} >{moment(messageTime).format('hh:mm')}</small>
      </div>
    </div>
  );
};

export default Messages;
