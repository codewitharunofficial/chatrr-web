import { createContext, useContext, useState } from "react";

const CurrentChatContext = createContext();

const CurrentChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState([]);

  return (
    <CurrentChatContext.Provider value={[currentChat, setCurrentChat]}>
      {children}
    </CurrentChatContext.Provider>
  );
};

const useCurrentChat = () => useContext(CurrentChatContext);

export {CurrentChatProvider, useCurrentChat}
