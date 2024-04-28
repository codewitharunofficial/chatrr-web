import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ChatsCard from "./Chatlist";
import { useCurrentChat } from "../Contexts/CurrentChatContext";
import SendIcon from "@mui/icons-material/Send";
import UserProfile from "./UserProfile";
import EmojiPicker from "emoji-picker-react";
import {
  AccountCircle,
  AttachFileOutlined,
  InsertEmoticonRounded,
  WebStoriesOutlined,
} from "@mui/icons-material";
import { useCurrentConvo } from "../Contexts/CurrentConvoContext";
import moment from "moment";
import ConvoTopBar from "./ConvoTopBar";
import socketServcies from "../utils/SocketWebServices";
import HomeWhileLoading from "./HomeWhileLoading";
import { useUser } from "../Contexts/UserModelContext";
import { motion } from "framer-motion";
import Messages from "./Messages";
import Profile from "./Profile";
import { Drawer, IconButton } from "@mui/material";
import MyProfileDrawer from "./MyProfileDrawer";
import { useChat } from "../Contexts/ShowChatMessages";
import Loader from "./Loader";

const defaultTheme = createTheme();

export default function Home() {
  const [chats, setChats] = React.useState([]);
  const [currentChat, setCurrentChat] = useCurrentChat();
  const [currentConvo] = useCurrentConvo();
  const [receiver, setReceiver] = React.useState({});
  const [openEmojis, setOpenEmojis] = React.useState(false);
  const [text, setText] = React.useState("");
  const navigation = useNavigate();
  const [isNewMsg, setIsNewMsg] = React.useState(false);
  const [isProfile] = useUser(false);
  const [showMyProfile, setShowMyProfile] = React.useState(false);
  const [showChatMesssages] = useChat();
  const [deviceWidth, setDeviceWidth] = React.useState(window.innerWidth);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  

  React.useEffect(() => {
    if (!user) {
      navigation("/login");
    } else {
      if (currentConvo?.receiverId === user?._id) {
        setReceiver(currentConvo?.sender);
      } else {
        setReceiver(currentConvo?.receiver);
      }
    }
    
    //eslint-disable-next-line
  }, [currentConvo]);

  console.log(receiver);

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
    if(!user){
         navigation('/login')
    }
    socketServcies.initializeSocket();
    socketServcies.emit("connected", user?._id);
    // socketServcies.emit("disconnect", user?._id);
    getChats();
    //eslint-disable-next-line
  }, [user?.id, isNewMsg]);

  React.useEffect(() => {
    setDeviceWidth(window.innerWidth)
  }, [window.innerWidth])

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
    <div
      style={{
        maxHeight: "100vh",
        width: "100%",
        position: "fixed",
        top: 80,
        paddingInline: 10,
      }}
    >
      {chats.length > 0 ? (
        <ThemeProvider theme={defaultTheme}>
          <div
            className="wrapper"
            style={{
              maxHeight: `${deviceWidth > 768 ? "100vh"  : "auto"}`,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <CssBaseline />
            <div style={{display: `${showChatMesssages === true && deviceWidth <= 768 ? "none" : "grid"}`}}
              className={`d-${showChatMesssages === true && deviceWidth <= 768 ? "none" : deviceWidth < 768 ? "grid col-12" : "grid col-md-3"}`}
            >
              <div
                className="chathead"
                style={{
                  display: `flex`,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  width: "100%",
                  height: 60,
                  backgroundColor: "lightblue",
                  padding: 20,
                  gap: 20,
                }}
              >
                <IconButton
                  sx={{
                    ":hover": { backgroundColor: "gray" },
                    alignSelf: "center",
                  }}
                  onClick={() => setShowMyProfile(!showMyProfile)}
                  component="span"
                >
                  <WebStoriesOutlined />
                </IconButton>
                <IconButton
                  sx={{
                    ":hover": { backgroundColor: "gray" },
                    alignSelf: "center",
                    ":focus": {backgroundColor: "gray"}
                  }}
                  onClick={() => setShowMyProfile(!showMyProfile)}
                  component="span"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              {showMyProfile ? (
                <Profile />
              ) : (
                <Box
                  className={`d-${
                    showChatMesssages === true && window.innerWidth <= "768"
                      ? "none"
                      : "col-md-12"
                  }`}
                  style={{ height: "70vh", marginTop: 0 }}
                >
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
                              chat?.chat[chat?.chat.length - 1]?.message
                                ?.asset_id
                            ? "You Sent An Attachment"
                            : user?._id ===
                                chat?.chat[chat?.chat.length - 1]?.reciever &&
                              chat?.chat[chat?.chat.length - 1]?.message
                                ?.asset_id
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
                </Box>
              )}
            </div>
            <div
              className={`d-${
                deviceWidth <= 768 ? "grid col-12" :
                 deviceWidth <= 768 && showChatMesssages ? `none`
                  : `grid ${isProfile ? "col-md-5" : "col-md-9 mr-0 ml-0"}`
              }`}
              style={{
                borderLeft: "0.5px solid gray",
                borderRight: "0.5px solid gray",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxHeight: "65vh",
                  minHeight: "65vh",
                  width: "100%",
                  paddingX: "10px",
                  // paddingRight: "3em",
                }}
              >
                {currentChat?.length > 0 && (
                  <ConvoTopBar
                    profilePic={receiver?.profilePhoto?.secure_url}
                    lastseen={
                      receiver?.Is_Online === "true"
                        ? "Online"
                        : moment(receiver?.lastseen).fromNow()
                    }
                    name={receiver?.name}
                    user={receiver}
                  />
                )}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "scroll",
                    scrollBehavior: "smooth",
                    paddingInline: 10,
                  }}
                >
                  {
                    showChatMesssages && currentChat?.length < 1 ? (
                           <Loader />
                    ) : (
                      currentChat?.length > 0 ? (
                        currentChat?.map((message) =>
                          message?.type === "Text" ? (
                            <Messages key={message?._id} message={message} />
                          ) : (
                            <p
                            key={message?._id}
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
                        <p
                          style={{ alignSelf: "center", justifyContent: "center" }}
                        >
                          Tap On A Conversation from the Coversations List on the
                          left To See Messages Here
                        </p>
                      )
                    )
                  }
                  {openEmojis && (
                    <EmojiPicker
                      style={{ position: "absolute", bottom: 60 }}
                      open={openEmojis}
                      onEmojiClick={(emoji) =>
                        setText(text.concat(emoji?.emoji))
                      }
                    />
                  )}
                </div>
              </Box>

              {currentChat?.length > 0 && (
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
                      aria-multiline={true}
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

            <motion.div
              className={`${isProfile ? "show col-md-4 mr-0" : "hide"}`}
            >
              {/* {isProfile && <UserProfile user={receiver} />} */}
              <UserProfile user={receiver} />
            </motion.div>
          </div>
        </ThemeProvider>
      ) : (
        <HomeWhileLoading />
      )}
    </div>
  );
}
