// context/ProContext.js
import React, { createContext, useContext, useState } from "react";

const ProContext = createContext({
  isPro: false,
  setIsPro: () => {},
});

export const ProProvider = ({ children }) => {
  // TODO: later load this from secure storage / backend
  const [isPro, setIsPro] = useState(false); // set to true to test Pro mode

  return (
    <ProContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </ProContext.Provider>
  );
};

export const usePro = () => useContext(ProContext);
