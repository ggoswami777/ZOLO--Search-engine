import React, { createContext, useState, useContext } from "react";

interface ShopContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  wikiSearchData:any[];
  setWikiSearchData:React.Dispatch<React.SetStateAction<any[]>>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const ShopContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wikiSearchData,setWikiSearchData]=useState<any[]>([]);

  return (
    <ShopContext.Provider value={{ searchQuery, setSearchQuery,wikiSearchData,setWikiSearchData }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopContextProvider");
  }
  return context;
};

export default ShopContextProvider;
