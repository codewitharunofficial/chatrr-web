import { createContext, useContext, useState } from "react";

const NetworkContext = createContext();

const ServerProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState();

  return (
    <NetworkContext.Provider value={[isConnected, setIsConnected]}>
      {children}
    </NetworkContext.Provider>
  );
};

const useServer = () => useContext(NetworkContext);

export {ServerProvider, useServer}
