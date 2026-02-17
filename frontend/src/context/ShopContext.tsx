import React, { createContext, useState, useContext } from "react";

interface ShopContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <ShopContext.Provider value={{ searchQuery, setSearchQuery }}>
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
