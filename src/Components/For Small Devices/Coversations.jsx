import React from "react";
import Conversation from "../Conversation";
import { Box, IconButton } from "@mui/material";
import { AttachFileOutlined, InsertEmoticonRounded } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { useCurrentChat } from "../../Contexts/CurrentChatContext";
import socketServcies from "../../utils/SocketWebServices";
import { useChat } from "../../Contexts/ShowChatMessages";
import UserProfile from '../UserProfile';
import { useUser } from "../../Contexts/UserModelContext";

const Coversations = ({ receiver, currentConvo, showChatMessages }) => {
  const [currentChat, setCurrentChat] = useCurrentChat();
  const [text, setText] = React.useState("");
  const [openEmojis, setOpenEmojis] = React.useState(false);
  const [isNewMsg, setIsNewMsg] = React.useState(false);
  const [isProfile, setIsProfile] = useUser(false);

  // const [showChatMessages] = useChat();

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const queries = {
    sender: user?._id,
    reciever: receiver?._id,
    convoId: currentConvo?._id,
    message: text,
  };

  const sendMessage = () => {
    // console.log(queries);
    try {
      socketServcies.emit("send-message", queries);
      socketServcies.on("recieved-message", (data) => {
        setCurrentChat(data?.messages);
        if (data?.newMessage) {
          setIsNewMsg(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {
        isProfile ? (
          <UserProfile user={receiver} setIsProfile={setIsProfile} />
        ) : (
          <div className="d-gird col-md-12 col-sm-12">
        <Conversation
          showChatMesssages={showChatMessages}
          currentChat={currentChat}
          receiver={receiver}
          openEmojis={openEmojis}
          setText={setText}
          text={text}
          user={user}
        />

        {currentChat?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: "rgba(255, 255, 255, 0.9)",
              justifyContent: "center",
              marginTop: -7,
              backgroundColor: 'lightblue',
              paddingTop: 1,
              paddingBottom: 1 
            }}
          >
            <Box
              className="w-sm-100 p-sm-2"
              sx={{
                width: "90%",
                height: '25%',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "rgba(255, 255, 255, 1)",
                border: "1px solid gray",
                borderRadius: 30,
                gap: 2,
                paddingX: 3,
              }}
            >
              <InsertEmoticonRounded
                sx={{":focus": {color: 'lightblue'} }}
                onClick={() => setOpenEmojis(!openEmojis)}
                className="emoji"
                style={{ fontSize: 30, cursor: "pointer" }}
              />
              <AttachFileOutlined
                sx={{ ":hover": { color: "black" } }}
                style={{ fontSize: 30, cursor: "pointer" }}
              />
              <input
                required
                id="message"
                placeholder="Type Your Message Here..."
                name="message"
                aria-multiline={true}
                style={{
                  padding: 10,
                  border: "none",
                  alignSelf: "center",
                  flex: 1,
                  outline: "none",
                  paddingTop: -5,
                  paddingBottom: -5
                }}
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <SendIcon
                onClick={() => {
                  sendMessage();
                  setText("");
                }}
                style={{ cursor: "pointer", alignSelf: "center" }}
                sx={{ ":hover": { color: "green" } }}
              />
            </Box>
          </Box>
        )}
      </div>
        )
      }
    </div>
  );
};

export default Coversations;
