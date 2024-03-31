import { createContext, useContext, useState } from "react";

const CurrentConvoContext = createContext();

const CurrentConvoProvider = ({ children }) => {
  const [currentConvo, setCurrentConvo] = useState();

  return (
    <CurrentConvoContext.Provider value={[currentConvo, setCurrentConvo]}>
      {children}
    </CurrentConvoContext.Provider>
  );
};

const useCurrentConvo = () => useContext(CurrentConvoContext);

export {CurrentConvoProvider, useCurrentConvo}
