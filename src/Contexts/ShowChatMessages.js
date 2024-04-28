import { createContext, useContext, useState } from "react";

const ShowChatContext = createContext();

const ChatMessageProvider = ({ children }) => {
  const [showChatMessages, setShowChatMessages] = useState(false);
  return (
    <ShowChatContext.Provider value={[showChatMessages, setShowChatMessages]}>
      {children}
    </ShowChatContext.Provider>
  );
};

const useChat = () => useContext(ShowChatContext);

export {ChatMessageProvider, useChat}
