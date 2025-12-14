// SubscriptionContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const SubscriptionContext = createContext(null);

// 👇 Use this in screens to read isPro:
export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used inside SubscriptionProvider");
  }
  return ctx;
}

export function SubscriptionProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // 🔑 Replace with your RevenueCat public SDK key (iOS)
        await Purchases.configure({
          apiKey: "REVENUECAT_PUBLIC_IOS_API_KEY",
          // optional: appUserID, observerMode etc.
        });

        const customerInfo = await Purchases.getCustomerInfo();
        const hasPro = !!customerInfo.entitlements.active["pro"];
        setIsPro(hasPro);
      } catch (e) {
        console.warn("RevenueCat init error:", e);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // Optional: helper to refresh after purchase / restore
  async function refreshCustomerInfo() {
    try {
      const info = await Purchases.getCustomerInfo();
      const hasPro = !!info.entitlements.active["pro"];
      setIsPro(hasPro);
    } catch (e) {
      console.warn("refreshCustomerInfo error:", e);
    }
  }

  const value = { isPro, loading, refreshCustomerInfo };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
