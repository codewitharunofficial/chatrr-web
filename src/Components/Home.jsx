import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ChatsCard from "./Chatlist";
import { useCurrentChat } from "../Contexts/CurrentChatContext";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UserProfile from "./UserProfile";
import BasicMenu from "./Menu";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import {
  AccountCircle,
  AttachFileOutlined,
  Info,
  InsertEmoticonRounded,
  MessageTwoTone,
  WebStoriesOutlined,
} from "@mui/icons-material";
import { useCurrentConvo } from "../Contexts/CurrentConvoContext";
import moment from "moment";
import ConvoTopBar from "./ConvoTopBar";
import socketServcies from "../utils/SocketWebServices";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Chatrr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Home() {
  const [chats, setChats] = React.useState([]);
  // const [selectedChat, setSelectedChat] = React.useState({});
  const [currentChat, setCurrentChat] = useCurrentChat();
  const [currentConvo, setCurrentConvo] = useCurrentConvo();
  // const [convoId] = useCurrentConvo();
  const [sender, setSender] = React.useState({});
  const [receiver, setReceiver] = React.useState({});
  const [openEmojis, setOpenEmojis] = React.useState(false);
  const [text, setText] = React.useState("");
  const navigation = useNavigate();
  const [isNewMsg, setIsNewMsg] = React.useState(false);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  React.useEffect(() => {
    if (!user) {
      navigation("/login");
    } else {
      if(currentConvo?.receiverId === user?._id){
        setReceiver(currentConvo?.sender)
      } else {
        setReceiver(currentConvo?.receiver)
      }
    }
  });
  // console.log(currentConvo);

  const getChats = async () => {
    try {
      const { data } = await axios.get(
        `https://android-chattr-app.onrender.com/api/v1/messages/chats/${user?._id}`
      );
      setChats(data?.chats);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    socketServcies.initializeSocket();
    socketServcies.emit("connected", user?._id);
    getChats();
    
  }, [user?.id, isNewMsg]);

  const queries = {
    sender: user?._id,
    reciever: receiver?._id,
    convoId: currentConvo?._id,
    message: text
  }


  const sendMessage = () => {
    // console.log(queries);
    try {
      socketServcies.emit("send-message", queries);
      socketServcies.on("recieved-message", (data) => {
        setCurrentChat(data?.messages);
        if(data?.newMessage) {
          setIsNewMsg(true);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div
      style={{ maxHeight: "100vh", width: "100%", position: "fixed", top: 80 }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ maxHeight: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={12}
            md={4}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <UserProfile /> */}
            <div
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "lightblue",
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: "flex-end",
                gap: 20
              }}
            >
              
              <WebStoriesOutlined />
              <AccountCircle />
              
            </div>
            {chats.length > 0 &&
              chats.map((chat) => (
                <ChatsCard
                id={chat?._id}
                chat={chat}
                  participants={[chat?.sender, chat?.receiver]}
                  participantsIds={[chat?.senderId, chat?.receiverId]}
                  key={chat._id}
                  name={
                    user?._id === chat?.senderId
                      ? chat?.receiver?.name
                      : chat?.sender?.name
                  }
                  lastMessage={
                    chat?.chat[chat?.chat.length - 1]?.message?.message
                      ? chat?.chat[
                          chat.chat.length - 1
                        ]?.message?.message.slice(0, 40)
                      : user?._id ===
                          chat?.chat[chat?.chat.length - 1]?.sender &&
                        chat?.chat[chat?.chat.length - 1]?.message?.asset_id
                      ? "You Sent An Attachment"
                      : user?._id ===
                          chat?.chat[chat?.chat.length - 1]?.reciever &&
                        chat?.chat[chat?.chat.length - 1]?.message?.asset_id
                      ? `${chat?.sender?.name} Sent you An Attachment`
                      : null
                  }
                  profilePic={
                    user?._id === chat?.senderId
                      ? chat?.receiver?.profilePhoto?.secure_url
                      : chat?.sender?.profilePhoto?.secure_url
                  }
                  lastMessageAt={chat?.updatedAt}
                />
              ))}
          </Grid>
          {/* <BasicMenu /> */}
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "65vh",
                minHeight: "65vh",
                width: "100%",
                paddingX: "10px",
                paddingRight: "3em",
                // marginBotttom: 20,
              }}
            >
              <ConvoTopBar profilePic={receiver?.profilePhoto?.secure_url} lastseen={receiver?.Is_online === true
                      ? "Online"
                      : moment(receiver?.lastseen).fromNow()} name={receiver?.name} />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column-reverse",
                  overflow: "scroll",
                }}
              >
                {currentChat?.length > 0 ? (
                  currentChat?.map((message) =>
                    message?.type === "Text" ? (
                      <p key={message?._id}
                        style={{
                          backgroundColor:
                            user?._id === message?.sender ? "gray" : "purple",
                          alignSelf:
                            user?._id === message?.sender
                              ? "flex-end"
                              : "flex-start",
                          maxWidth: "40%",
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        {message?.message?.message}
                      </p>
                    ) : (
                      <p
                        style={{
                          backgroundColor:
                            user?._id === message?.sender ? "gray" : "purple",
                          alignSelf:
                            user?._id === message?.sender
                              ? "flex-end"
                              : "flex-start",
                          maxWidth: "40%",
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        This is an Attachment
                      </p>
                    )
                  )
                ) : (
                  <p style={{ alignSelf: "center" }}>
                    Tap On A Conversation from the Coversations List on the left
                    To See Messages Here
                  </p>
                )}
                {openEmojis && (
                  <EmojiPicker
                    style={{ position: "absolute", bottom: 60 }}
                    open={openEmojis}
                    onEmojiClick={(emoji) => setText(text.concat(emoji?.emoji))}
                  />
                )}
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                background: "rgba(255, 255, 255, 0.9)",
                justifyContent: "center",
                marginTop: -5,
              }}
            >
              <Box
                sx={{
                  width: "90%",
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
                  sx={{ ":hover": { color: "black" } }}
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
                  // rows={'auto'}
                  aria-multiline={true}
                  //  sx={{}}
                  style={{
                    padding: 10,
                    border: "none",
                    alignSelf: "center",
                    flex: 1,
                    outline: "none",
                  }}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />

                <SendIcon
                type="submit"
                  style={{ cursor: "pointer", alignSelf: "center" }}
                  onClick={() => {
                    sendMessage();
                    setText("");
                  }}
                  sx={{ ":hover": { color: "black" } }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
