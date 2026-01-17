// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { Platform } from "react-native";
// import Purchases, { LOG_LEVEL } from "react-native-purchases";

// const ProContext = createContext(null);

// // ✅ Paste your RevenueCat PUBLIC iOS API key here
// const RC_IOS_API_KEY = "appl_GFhuOCJwVXIenGDkBYVyRMSBHnS";

// export function ProProvider({ children }) {
//   const [isLoading, setIsLoading] = useState(true); // initial status check
//   const [isPurchasing, setIsPurchasing] = useState(false); // purchase/restore in-progress
//   const [isPro, setIsPro] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState(null);
//   const [lastError, setLastError] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     let removeListener = null;

//     async function init() {
//       try {
//         // Optional: helpful logs during development
//         // Remove or keep; App Store build is fine either way.
//         Purchases.setLogLevel(LOG_LEVEL.INFO);

//         if (Platform.OS === "ios") {
//           Purchases.configure({ apiKey: RC_IOS_API_KEY });
//         } else {
//           // If you later add Android, set an Android key here
//           Purchases.configure({ apiKey: "goog_yJZuFLLUVPvlgbootmtaBbAFNhU" });
//         }

//         // Listen for updates (renewals, restores, etc.)
//         const listener = Purchases.addCustomerInfoUpdateListener((info) => {
//           if (!mounted) return;
//           setCustomerInfo(info);
//           setIsPro(Boolean(info?.entitlements?.active?.pro));
//         });

//         // RevenueCat listener returns a function in some versions, or an object with remove in others.
//         removeListener =
//           typeof listener === "function"
//             ? listener
//             : listener?.remove
//             ? () => listener.remove()
//             : null;

//         // Initial fetch
//         const info = await Purchases.getCustomerInfo();
//         if (!mounted) return;

//         setCustomerInfo(info);
//         setIsPro(Boolean(info?.entitlements?.active?.pro));
//         setIsLoading(false);
//       } catch (e) {
//         if (!mounted) return;
//         setLastError(e);
//         setIsLoading(false);
//       }
//     }

//     init();

//     return () => {
//       mounted = false;
//       if (removeListener) removeListener();
//     };
//   }, []);

//   const refresh = async () => {
//     const info = await Purchases.getCustomerInfo();
//     setCustomerInfo(info);
//     setIsPro(Boolean(info?.entitlements?.active?.pro));
//     return info;
//   };

//   const purchaseAnnual = async () => {
//     setLastError(null);
//     setIsPurchasing(true);
//     try {
//       const offerings = await Purchases.getOfferings();
//       console.log("RC key used:", RC_IOS_API_KEY);
//       console.log("RC offerings:", JSON.stringify(offerings, null, 2));

//       const current = offerings.current;

//       // if (!current || !current.availablePackages?.length) {
//       //   throw new Error(
//       //     "No RevenueCat offerings/packages found. Check RevenueCat Offering + App Store product ID."
//       //   );
//       // }
//       if (!current || !current.availablePackages?.length) {
//         throw new Error(
//           `No packages returned. offerings.current=${current ? "YES" : "NO"}`
//         );
//       }

//       // Pick annual package if available, else first
//       const annual =
//         current.availablePackages.find(
//           (p) => p.packageType === Purchases.PACKAGE_TYPE.ANNUAL
//         ) || current.availablePackages[0];

//       const result = await Purchases.purchasePackage(annual);

//       setCustomerInfo(result.customerInfo);
//       setIsPro(Boolean(result.customerInfo?.entitlements?.active?.pro));

//       return result;
//     } catch (e) {
//       setLastError(e);
//       throw e;
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   const restore = async () => {
//     setLastError(null);
//     setIsPurchasing(true);
//     try {
//       const info = await Purchases.restorePurchases();
//       setCustomerInfo(info);
//       setIsPro(Boolean(info?.entitlements?.active?.pro));
//       return info;
//     } catch (e) {
//       setLastError(e);
//       throw e;
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   const value = useMemo(
//     () => ({
//       isLoading,
//       isPurchasing,
//       isPro,
//       customerInfo,
//       lastError,
//       refresh,
//       purchaseAnnual,
//       restore,
//     }),
//     [isLoading, isPurchasing, isPro, customerInfo, lastError]
//   );

//   return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
// }

// export function usePro() {
//   const ctx = useContext(ProContext);
//   if (!ctx) throw new Error("usePro must be used within ProProvider");
//   return ctx;
// }

// // context/ProContext.js
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { Platform } from "react-native";
// import Purchases, { LOG_LEVEL } from "react-native-purchases";

// const ProContext = createContext(null);

// // ✅ Paste your RevenueCat PUBLIC iOS API key here
// const RC_IOS_API_KEY = "appl_GFhuOCJwVXIenGDkBYVyRMSBHnS";

// export function ProProvider({ children }) {
//   const [isLoading, setIsLoading] = useState(true); // initial status check
//   const [isPurchasing, setIsPurchasing] = useState(false); // purchase/restore in-progress
//   const [isPro, setIsPro] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState(null);
//   const [lastError, setLastError] = useState(null);

//   // ✅ Screenshot-only bypass (set EXPO_PUBLIC_SCREENSHOT_MODE=1 in .env)
//   const SCREENSHOT_MODE = process.env.EXPO_PUBLIC_SCREENSHOT_MODE === "1";
//   const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

//   useEffect(() => {
//     let mounted = true;
//     let removeListener = null;

//     async function init() {
//       try {
//         // Optional: helpful logs during development
//         Purchases.setLogLevel(LOG_LEVEL.INFO);

//         if (Platform.OS === "ios") {
//           Purchases.configure({ apiKey: RC_IOS_API_KEY });
//         } else {
//           // If you later add Android, set an Android key here
//           Purchases.configure({ apiKey: "goog_yJZuFLLUVPvlgbootmtaBbAFNhU" });
//         }

//         // Listen for updates (renewals, restores, etc.)
//         const listener = Purchases.addCustomerInfoUpdateListener((info) => {
//           if (!mounted) return;
//           setCustomerInfo(info);
//           setIsPro(Boolean(info?.entitlements?.active?.pro));
//         });

//         // RevenueCat listener returns a function in some versions, or an object with remove in others.
//         removeListener =
//           typeof listener === "function"
//             ? listener
//             : listener?.remove
//             ? () => listener.remove()
//             : null;

//         // Initial fetch
//         const info = await Purchases.getCustomerInfo();
//         if (!mounted) return;

//         setCustomerInfo(info);
//         setIsPro(Boolean(info?.entitlements?.active?.pro));
//         setIsLoading(false);
//       } catch (e) {
//         if (!mounted) return;
//         setLastError(e);
//         setIsLoading(false);
//       }
//     }

//     init();

//     return () => {
//       mounted = false;
//       if (removeListener) removeListener();
//     };
//   }, []);

//   const refresh = async () => {
//     const info = await Purchases.getCustomerInfo();
//     setCustomerInfo(info);
//     setIsPro(Boolean(info?.entitlements?.active?.pro));
//     return info;
//   };

//   const purchaseAnnual = async () => {
//     setLastError(null);
//     setIsPurchasing(true);
//     try {
//       const offerings = await Purchases.getOfferings();
//       console.log("RC key used:", RC_IOS_API_KEY);
//       console.log("RC offerings:", JSON.stringify(offerings, null, 2));

//       const current = offerings.current;

//       if (!current || !current.availablePackages?.length) {
//         throw new Error(
//           `No packages returned. offerings.current=${current ? "YES" : "NO"}`
//         );
//       }

//       // Pick annual package if available, else first
//       const annual =
//         current.availablePackages.find(
//           (p) => p.packageType === Purchases.PACKAGE_TYPE.ANNUAL
//         ) || current.availablePackages[0];

//       const result = await Purchases.purchasePackage(annual);

//       setCustomerInfo(result.customerInfo);
//       setIsPro(Boolean(result.customerInfo?.entitlements?.active?.pro));

//       return result;
//     } catch (e) {
//       setLastError(e);
//       throw e;
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   const restore = async () => {
//     setLastError(null);
//     setIsPurchasing(true);
//     try {
//       const info = await Purchases.restorePurchases();
//       setCustomerInfo(info);
//       setIsPro(Boolean(info?.entitlements?.active?.pro));
//       return info;
//     } catch (e) {
//       setLastError(e);
//       throw e;
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   const value = useMemo(
//     () => ({
//       isLoading,
//       isPurchasing,
//       isPro: effectiveIsPro,
//       customerInfo,
//       lastError,
//       refresh,
//       purchaseAnnual,
//       restore,
//       // (optional) expose screenshot flag if you ever want it in UI:
//       // screenshotMode: SCREENSHOT_MODE,
//     }),
//     [isLoading, isPurchasing, effectiveIsPro, customerInfo, lastError]
//   );

//   return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
// }

// export function usePro() {
//   const ctx = useContext(ProContext);
//   if (!ctx) throw new Error("usePro must be used within ProProvider");
//   return ctx;
// }

// context/ProContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

const ProContext = createContext(null);

// ✅ Paste your RevenueCat PUBLIC iOS API key here
const RC_IOS_API_KEY = "appl_GFhuOCJwVXIenGDkBYVyRMSBHnS";

export function ProProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true); // initial status check
  const [isPurchasing, setIsPurchasing] = useState(false); // purchase/restore in-progress
  const [isPro, setIsPro] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [lastError, setLastError] = useState(null);

  // ✅ Screenshot-only bypass (set EXPO_PUBLIC_SCREENSHOT_MODE=1 in .env)
  const SCREENSHOT_MODE = process.env.EXPO_PUBLIC_SCREENSHOT_MODE === "1";
  const effectiveIsPro = SCREENSHOT_MODE ? true : isPro;

  useEffect(() => {
    let mounted = true;
    let removeListener = null;

    async function init() {
      try {
        // Optional: helpful logs during development
        Purchases.setLogLevel(LOG_LEVEL.INFO);

        if (Platform.OS === "ios") {
          Purchases.configure({ apiKey: RC_IOS_API_KEY });
        } else {
          // If you later add Android, set an Android key here
          Purchases.configure({ apiKey: "goog_yJZuFLLUVPvlgbootmtaBbAFNhU" });
        }

        // Listen for updates (renewals, restores, etc.)
        const listener = Purchases.addCustomerInfoUpdateListener((info) => {
          if (!mounted) return;
          setCustomerInfo(info);
          setIsPro(Boolean(info?.entitlements?.active?.pro));
        });

        // RevenueCat listener returns a function in some versions, or an object with remove in others.
        removeListener =
          typeof listener === "function"
            ? listener
            : listener?.remove
            ? () => listener.remove()
            : null;

        // Initial fetch
        const info = await Purchases.getCustomerInfo();
        if (!mounted) return;

        setCustomerInfo(info);
        setIsPro(Boolean(info?.entitlements?.active?.pro));
        setIsLoading(false);
      } catch (e) {
        if (!mounted) return;
        setLastError(e);
        setIsLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
      if (removeListener) removeListener();
    };
  }, []);

  const refresh = async () => {
    const info = await Purchases.getCustomerInfo();
    setCustomerInfo(info);
    setIsPro(Boolean(info?.entitlements?.active?.pro));
    return info;
  };

  const purchaseAnnual = async () => {
    setLastError(null);
    setIsPurchasing(true);
    try {
      const offerings = await Purchases.getOfferings();
      console.log("RC key used:", RC_IOS_API_KEY);
      console.log("RC offerings:", JSON.stringify(offerings, null, 2));

      const current = offerings.current;

      if (!current || !current.availablePackages?.length) {
        throw new Error(
          `No packages returned. offerings.current=${current ? "YES" : "NO"}`
        );
      }

      // Pick annual package if available, else first
      const annual =
        current.availablePackages.find(
          (p) => p.packageType === Purchases.PACKAGE_TYPE.ANNUAL
        ) || current.availablePackages[0];

      const result = await Purchases.purchasePackage(annual);

      setCustomerInfo(result.customerInfo);
      setIsPro(Boolean(result.customerInfo?.entitlements?.active?.pro));

      return result;
    } catch (e) {
      setLastError(e);
      throw e;
    } finally {
      setIsPurchasing(false);
    }
  };

  const restore = async () => {
    setLastError(null);
    setIsPurchasing(true);
    try {
      const info = await Purchases.restorePurchases();
      setCustomerInfo(info);
      setIsPro(Boolean(info?.entitlements?.active?.pro));
      return info;
    } catch (e) {
      setLastError(e);
      throw e;
    } finally {
      setIsPurchasing(false);
    }
  };

  const value = useMemo(
    () => ({
      isLoading,
      isPurchasing,
      isPro: effectiveIsPro,
      customerInfo,
      lastError,
      refresh,
      purchaseAnnual,
      restore,
      // (optional) expose screenshot flag if you ever want it in UI:
      // screenshotMode: SCREENSHOT_MODE,
    }),
    [isLoading, isPurchasing, effectiveIsPro, customerInfo, lastError]
  );

  return <ProContext.Provider value={value}>{children}</ProContext.Provider>;
}

export function usePro() {
  const ctx = useContext(ProContext);
  if (!ctx) throw new Error("usePro must be used within ProProvider");
  return ctx;
}
