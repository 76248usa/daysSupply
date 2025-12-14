// context/ProContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProContext = createContext(null);

const TRIAL_DAYS = 30;
const INSTALL_DATE_KEY = "installDate";

export function ProProvider({ children }) {
  const [installDate, setInstallDate] = useState(null);
  const [isPro, setIsPro] = useState(false); // 🔐 hardcoded for now

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(INSTALL_DATE_KEY);
        if (stored) {
          setInstallDate(new Date(stored));
        } else {
          const now = new Date();
          setInstallDate(now);
          await AsyncStorage.setItem(INSTALL_DATE_KEY, now.toISOString());
        }
      } catch (e) {
        console.warn("Failed to load/save install date", e);
      }
    })();
  }, []);

  // If we don’t have an installDate yet, treat as not expired
  let trialExpired = false;
  let daysLeft = TRIAL_DAYS;

  if (installDate) {
    const now = new Date();
    const diffMs = now.getTime() - installDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    trialExpired = diffDays >= TRIAL_DAYS;
    daysLeft = Math.max(TRIAL_DAYS - diffDays, 0);
  }

  return (
    <ProContext.Provider
      value={{
        isPro,
        setIsPro, // later you can set true from subscription
        trialExpired,
        daysLeft,
      }}
    >
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) {
    throw new Error("usePro must be used inside ProProvider");
  }
  return ctx;
}
