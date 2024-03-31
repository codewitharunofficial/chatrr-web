import { Info } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentChat } from "../Contexts/CurrentChatContext";

const ConvoTopBar = ({ profilePic, name, lastseen }) => {
  const navigation = useNavigate();
  const [currentChat, setCurrentChat] = useCurrentChat();

  return (
    <div
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "lightblue",
        alignItems: "center",
        paddingY: 10,
        marginBottom: 20,
        marginTop: -65,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: 10,
      }}
    >
      <img
        src={profilePic}
        alt={name}
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          border: "2px solid white",
        }}
      />
      <div
        style={{
          height: 50,
          alignSelf: "center",
          paddingY: 5,
          flex: 0.98,
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        {
          currentChat?.length > 0 ? (
            <>
<h6 style={{ textAlign: "center" }}>{name}</h6>
            <p
          style={{
            textAlign: "center",
            color: lastseen === true ? "green" : "white",
            fontSize: 14,
          }}
        >
          {lastseen}
        </p>
            </>
          ) : (
         <h6 style={{ textAlign: "center" }}>Coversation</h6>
          )
        }
        
      </div>
      <Info
        style={{ cursor: "pointer" }}
        onClick={() => navigation("/profile")}
        sx={{ ":hover": { color: "white" } }}
      />
    </div>
  );
};

export default ConvoTopBar;
