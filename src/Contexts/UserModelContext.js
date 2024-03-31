import { createContext, useContext, useState } from "react";

const UserModelContext = createContext();

const UserProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <UserModelContext.Provider value={[open, setOpen]}>
      {children}
    </UserModelContext.Provider>
  );
};

const useUser = () => useContext(UserModelContext);

export {UserProvider, useUser}
