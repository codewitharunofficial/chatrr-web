import { createContext, useContext, useState } from "react";

const UserModelContext = createContext();

const UserProvider = ({ children }) => {
  const [isProfile, setIsProfile] = useState(false);

  return (
    <UserModelContext.Provider value={[isProfile, setIsProfile]}>
      {children}
    </UserModelContext.Provider>
  );
};

const useUser = () => useContext(UserModelContext);

export {UserProvider, useUser}
