import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider value={[isSearching, setIsSearching]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export {SearchProvider, useSearch}
