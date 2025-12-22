// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Text,
//   useWindowDimensions,
//   SafeAreaView,
// } from "react-native";
// import { medicineData } from "./data/MedicineData";
// import { useFocusEffect } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { usePro } from "./context/ProContext"; // ⬅️ new

// function AdBannerPlaceholder() {
//   return (
//     <View
//       style={{
//         height: 50,
//         borderRadius: 8,
//         marginTop: 12,
//         alignItems: "center",
//         justifyContent: "center",
//         borderWidth: 1,
//         borderColor: "#444",
//       }}
//     >
//       <Text style={{ color: "#aaa", fontSize: 12 }}>Ad banner here</Text>
//     </View>
//   );
// }

// const HomeScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState("");
//   const { width, height } = useWindowDimensions();
//   const { isPro, trialExpired, daysLeft } = usePro(); // ⬅️ from context

//   const filteredItems = medicineData.filter((item) =>
//     item?.name?.toLowerCase().includes(searchText.toLowerCase())
//   );

//   useFocusEffect(
//     React.useCallback(() => {
//       setSearchText("");
//     }, [])
//   );

//   const styles = createStyles(width, height);

//   return (
//     <LinearGradient colors={["#0b1720", "#020617"]} style={styles.screen}>
//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             <Text style={styles.appTitle}>Insulin Days’ Supply</Text>
//             <Text style={styles.appSubtitle}>
//               Fast day-supply & audit-safe calculations
//             </Text>

//             {/* Trial / Pro status row */}
//             <View style={styles.proRow}>
//               <Text style={styles.proStatusText}>
//                 {isPro
//                   ? "PRO active"
//                   : trialExpired
//                   ? "Trial ended – upgrade required"
//                   : `Free trial: ${daysLeft} day(s) left`}
//               </Text>
//             </View>

//             {/* Search Bar */}
//             <View style={styles.searchContainer}>
//               <Ionicons
//                 name="search"
//                 size={width * 0.05}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Search insulin name..."
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 placeholderTextColor="#bdc0c5"
//               />
//             </View>

//             {/* Medicine Buttons */}
//             <View style={styles.resultsContainer}>
//               {filteredItems.map((item) => (
//                 <TouchableOpacity
//                   key={item.id}
//                   onPress={() =>
//                     navigation.navigate("Details", {
//                       medicine: item,
//                     })
//                   }
//                   activeOpacity={0.7}
//                   style={styles.card}
//                 >
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   {item.addToName ? (
//                     <Text style={styles.cardSubtitle}>{item.addToName}</Text>
//                   ) : null}
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Optional ad placeholder for now */}
//             {!isPro && <AdBannerPlaceholder />}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const createStyles = (width, height) =>
//   StyleSheet.create({
//     screen: { flex: 1 },
//     safeArea: { flex: 1 },
//     container: {
//       paddingHorizontal: width * 0.05,
//       paddingVertical: height * 0.02,
//     },
//     appTitle: {
//       fontSize: width * 0.065,
//       fontWeight: "700",
//       color: "#e5e7eb",
//       textAlign: "center",
//       marginBottom: 4,
//     },
//     appSubtitle: {
//       fontSize: width * 0.038,
//       color: "#9ca3af",
//       textAlign: "center",
//       marginBottom: height * 0.02,
//     },
//     proRow: {
//       marginBottom: height * 0.015,
//     },
//     proStatusText: {
//       color: "#9ca3af",
//       fontSize: width * 0.035,
//       textAlign: "center",
//     },
//     searchContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       backgroundColor: "#020617",
//       borderRadius: width * 0.03,
//       paddingHorizontal: width * 0.03,
//       paddingVertical: height * 0.015,
//       marginBottom: height * 0.02,
//       borderWidth: 1,
//       borderColor: "#1f2937",
//     },
//     icon: { marginRight: width * 0.02 },
//     input: {
//       flex: 1,
//       fontSize: width * 0.045,
//       color: "#e5e7eb",
//     },
//     resultsContainer: {
//       alignItems: "center",
//     },
//     card: {
//       width: "100%",
//       backgroundColor: "#020617",
//       borderRadius: width * 0.03,
//       paddingVertical: height * 0.02,
//       paddingHorizontal: width * 0.04,
//       marginVertical: height * 0.008,
//       alignItems: "center",
//       borderWidth: 1,
//       borderColor: "#1e293b",
//     },
//     cardTitle: {
//       color: "#f9fafb",
//       fontSize: width * 0.045,
//       fontWeight: "600",
//       textAlign: "center",
//     },
//     cardSubtitle: {
//       color: "#c5c8cd",
//       fontSize: width * 0.035,
//       marginTop: height * 0.005,
//       textAlign: "center",
//     },
//   });

// export default HomeScreen;

import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { medicineData } from "./data/MedicineData";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { usePro } from "./context/ProContext"; // ✅ RevenueCat-backed context (or your ProContext)

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const { width, height } = useWindowDimensions();
  const { isPro, isLoading } = usePro(); // ✅ keep it simple + reliable

  const filteredItems = medicineData.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  useFocusEffect(
    React.useCallback(() => {
      setSearchText("");
    }, [])
  );

  const styles = createStyles(width, height);

  const handleOpenMedicine = (item) => {
    // ✅ Gate calculations (Details) behind trial/subscription
    if (!isPro) {
      navigation.navigate("Upgrade");
      return;
    }
    navigation.navigate("Details", { medicine: item });
  };

  return (
    <LinearGradient colors={["#0b1720", "#020617"]} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.appTitle}>Days’ Supply Calculator</Text>
            <Text style={styles.appSubtitle}>
              Fast, audit-safe day-supply calculations
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Disclaimer")}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  textAlign: "center",
                  marginBottom: 14,
                  textDecorationLine: "underline",
                }}
              >
                Disclaimer
              </Text>
            </TouchableOpacity>

            {/* Pro / Trial status */}
            <View style={styles.proRow}>
              <Text style={styles.proStatusText}>
                {isLoading
                  ? "Checking subscription…"
                  : isPro
                  ? "PRO active"
                  : "Start your 1-month free trial to unlock calculations"}
              </Text>

              {/* CTA button */}
              {!isLoading && !isPro && (
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => navigation.navigate("Upgrade")}
                  activeOpacity={0.85}
                >
                  <Text style={styles.ctaButtonText}>Start Free Trial</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={width * 0.05}
                color="#9ca3af"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Search insulin name..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#bdc0c5"
                autoCorrect={false}
                autoCapitalize="none"
                clearButtonMode="while-editing"
              />
            </View>

            {/* Medicine Buttons */}
            <View style={styles.resultsContainer}>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleOpenMedicine(item)}
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.addToName ? (
                    <Text style={styles.cardSubtitle}>{item.addToName}</Text>
                  ) : null}

                  {/* Subtle hint for locked state */}
                  {!isLoading && !isPro ? (
                    <Text style={styles.lockHint}>
                      Locked – start free trial
                    </Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer note */}
            {!isLoading && !isPro ? (
              <Text style={styles.footerNote}>
                Trial begins when you tap “Start Free Trial” and confirm with
                Apple.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const createStyles = (width, height) =>
  StyleSheet.create({
    screen: { flex: 1 },
    safeArea: { flex: 1 },
    container: {
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.02,
    },
    appTitle: {
      fontSize: width * 0.065,
      fontWeight: "800",
      color: "#e5e7eb",
      textAlign: "center",
      marginBottom: 4,
    },
    appSubtitle: {
      fontSize: width * 0.038,
      color: "#9ca3af",
      textAlign: "center",
      marginBottom: height * 0.02,
    },
    proRow: {
      marginBottom: height * 0.018,
      alignItems: "center",
    },
    proStatusText: {
      color: "#9ca3af",
      fontSize: width * 0.035,
      textAlign: "center",
    },
    ctaButton: {
      marginTop: 10,
      backgroundColor: "#0ABDE3",
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 14,
      alignItems: "center",
      width: "100%",
    },
    ctaButtonText: {
      fontWeight: "900",
      color: "#06202a",
      fontSize: width * 0.042,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#020617",
      borderRadius: width * 0.03,
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.015,
      marginBottom: height * 0.02,
      borderWidth: 1,
      borderColor: "#1f2937",
    },
    icon: { marginRight: width * 0.02 },
    input: {
      flex: 1,
      fontSize: width * 0.045,
      color: "#e5e7eb",
    },
    resultsContainer: {
      alignItems: "center",
    },
    card: {
      width: "100%",
      backgroundColor: "#020617",
      borderRadius: width * 0.03,
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
      marginVertical: height * 0.008,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#1e293b",
    },
    cardTitle: {
      color: "#f9fafb",
      fontSize: width * 0.045,
      fontWeight: "700",
      textAlign: "center",
    },
    cardSubtitle: {
      color: "#c5c8cd",
      fontSize: width * 0.035,
      marginTop: height * 0.005,
      textAlign: "center",
    },
    lockHint: {
      marginTop: 8,
      color: "#94a3b8",
      fontSize: width * 0.032,
      textAlign: "center",
    },
    footerNote: {
      marginTop: 16,
      color: "#64748b",
      fontSize: width * 0.03,
      textAlign: "center",
      lineHeight: width * 0.04,
    },
  });

export default HomeScreen;
