import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

const TabsProvider = ({ children }) => {
  const [focusHomeTab, setFocusHomeTab] = useState(true);

  return (
    <TabsContext.Provider value={[focusHomeTab, setFocusHomeTab]}>
      {children}
    </TabsContext.Provider>
  );
};

const useTabs = () => useContext(TabsContext);

export {TabsProvider, useTabs}
