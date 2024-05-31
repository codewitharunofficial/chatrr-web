import React from "react";
import Search from "../Search";
import { getChats } from "../../Constants/Functions";
import { useCurrentConvo } from "../../Contexts/CurrentConvoContext";
import { useNavigate } from "react-router-dom";
import socketServcies from "../../utils/SocketWebServices";
import ChatsCard from "../Chatlist";
import { useChat } from "../../Contexts/ShowChatMessages";
import Coversations from "./Coversations";
import { useCurrentChat } from "../../Contexts/CurrentChatContext";
import Loader from "../Loader";
import HomeWhileLoading from "../HomeWhileLoading";

const HomeForMob = ({ focusHome }) => {
  const [currentConvo] = useCurrentConvo();
  const [receiver, setReceiver] = React.useState();
  const [isNewMsg, setIsNewMsg] = React.useState(false);
  const [showChatMessages] = useChat();
  const [currentChat, setCurrentChat] = useCurrentChat();
  const [focusChats, setFocusChats] = React.useState(false);

  const [chats, setChats] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  const navigation = useNavigate();
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  React.useEffect(() => {
    if (!user) {
      navigation("/login");
    }
    socketServcies.initializeSocket();
     socketServcies.emit("connected", user?._id);
    const fetchChats = async () => {
      const chats = await getChats(user?._id);
      if (chats) {
        setChats(chats);
      }
    };
    fetchChats();
    setFocusChats(true);
    //eslint-disable-next-line
  }, [user?.id, isNewMsg]);

  // console.log(chats);

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
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "fixed", top: 80 }}>
      {chats?.length < 1 ? (
        <HomeWhileLoading />
      ) : showChatMessages ? (
        <Loader message={"Loading Messages..."} />
      ) : currentChat?.length > 0 ? (
        <Coversations
          showChatMessages={showChatMessages}
          receiver={receiver}
          currentConvo={currentConvo}
        />
      ) : chats?.length > 0 ? (
        <>
          <div
            style={{
              width: "100%",
              height: "5%",
              padding: 7,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 5,
            }}
          >
           {
            searching ? (<Search />) : (
              <>
               <button
              className="btn btn-primary"
              style={{
                width: "auto",
                border: "1px solid gray",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              New Chat
            </button>
            <button onClick={setSearching(true)} className="btn btn-primary w-25"
              style={{
                width: "auto",
                border: "1px solid gray",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              Search
            </button>
              </>
            )
           }
          </div>
          <hr />
          <div
            style={{
              width: "100%",
              height: "auto%",
              marginTop: 3,
              overflow: "scroll",
            }}
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
          </div>
        </>
      ) : (
        <Loader message={"Fetching Chats..."} />
      )}
    </div>
  );
};

export default HomeForMob;
