// // DetailsScreen.js
// import { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Keyboard,
//   Alert,
//   useWindowDimensions,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const PALETTE = {
//   bgStart: "#020617",
//   bgEnd: "#0f172a",
//   card: "#020617",
//   accent: "#06bcc1",
//   accentSoft: "#1f2937",
//   textPrimary: "#e5e7eb",
//   textSecondary: "#9ca3af",
//   inputBg: "#020617",
//   border: "#1f2937",
//   resultBg: "#020617",
//   danger: "#f97373",
// };

// const DetailsScreen = ({ route }) => {
//   const { medicine } = route.params;
//   const [units, setUnit] = useState("");
//   const [times, setTimes] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [boxAnswer, setBoxAnswer] = useState("");
//   const [directions, setDirections] = useState("");

//   const { width, height } = useWindowDimensions();
//   const styles = createResponsiveStyles(width, height);

//   const handleChange = (text) => setUnit(text);
//   const handleChange2 = (text) => setTimes(text);

//   function pressHandler() {
//     Keyboard.dismiss();

//     if (units.trim() === "" || times.trim() === "") {
//       Alert.alert("Validation Error", "Please fill in both fields.");
//       return;
//     }

//     const effectivePrime = medicine.prime > 0 ? medicine.prime : 0;
//     const firstSum = Number(times) * Number(units);
//     const primeSum = Number(times) * effectivePrime;
//     const secondSum = firstSum + primeSum;
//     const sum = medicine.unitsInPen / secondSum;
//     const expire = medicine.expire;
//     const box = medicine.pensAmount > 0 ? medicine.pensAmount : null;
//     const displayAnswer = sum > expire ? expire : sum;
//     const floorAnswer = Math.floor(displayAnswer);
//     setAnswer(floorAnswer);
//     setBoxAnswer(box ? floorAnswer * box : 0);
//     setDirections(medicine.dosage);
//   }

//   function resetHandler() {
//     Keyboard.dismiss();
//     setUnit("");
//     setTimes("");
//     setAnswer("");
//     setBoxAnswer("");
//     setDirections("");
//   }

//   return (
//     <LinearGradient
//       colors={[PALETTE.bgStart, PALETTE.bgEnd]}
//       style={styles.screen}
//     >
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             {/* Header Info */}
//             <Text style={styles.heading}>{medicine.name}</Text>
//             <Text style={styles.subHeading}>{medicine.addToName}</Text>
//             <Text style={styles.ndc}>{medicine.ndc}</Text>
//             {directions ? (
//               <Text style={styles.directions}>{directions}</Text>
//             ) : null}

//             {/* Answer Section */}
//             {(answer || boxAnswer) && (
//               <View style={styles.resultContainer}>
//                 {answer !== "" && (
//                   <View style={styles.resultBox}>
//                     <Text style={styles.resultLabel}>Days&apos; supply:</Text>
//                     <Text style={styles.resultValue}>{answer}</Text>
//                   </View>
//                 )}
//                 {boxAnswer > 0 && (
//                   <View style={styles.resultBox}>
//                     <Text style={styles.resultLabel}>
//                       Days&apos; supply per box:
//                     </Text>
//                     <Text style={styles.resultValue}>{boxAnswer}</Text>
//                   </View>
//                 )}
//               </View>
//             )}

//             {/* Input Fields */}
//             <Text style={styles.label}>Units per dose:</Text>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="e.g. 20"
//                 placeholderTextColor={PALETTE.textSecondary}
//                 value={units}
//                 onChangeText={handleChange}
//                 keyboardType="numeric"
//                 returnKeyType="next"
//               />
//             </View>

//             <Text style={styles.label}>Times per day:</Text>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="e.g. 2"
//                 placeholderTextColor={PALETTE.textSecondary}
//                 value={times}
//                 onChangeText={handleChange2}
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 onPress={pressHandler}
//                 style={styles.buttonPrimary}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.buttonText}>Confirm</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={resetHandler}
//                 style={styles.buttonSecondary}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.buttonText}>Reset</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const createResponsiveStyles = (width, height) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//     },
//     container: {
//       padding: width * 0.06,
//     },
//     heading: {
//       fontSize: width * 0.06,
//       fontWeight: "700",
//       color: PALETTE.accent,
//       textAlign: "center",
//       marginBottom: height * 0.008,
//     },
//     subHeading: {
//       fontSize: width * 0.04,
//       color: PALETTE.textSecondary,
//       textAlign: "center",
//       marginBottom: height * 0.005,
//     },
//     ndc: {
//       fontSize: width * 0.035,
//       color: PALETTE.textSecondary,
//       textAlign: "center",
//       marginBottom: height * 0.015,
//     },
//     directions: {
//       fontSize: width * 0.038,
//       color: PALETTE.danger,
//       textAlign: "center",
// //       marginBottom: height * 0.02,
// //       fontStyle: "italic",
// //     },
// //     resultContainer: {
// //       flexDirection: "row",
// //       justifyContent: "space-around",
// //       marginVertical: height * 0.02,
// //       backgroundColor: PALETTE.resultBg,
// //       padding: width * 0.04,
// //       borderRadius: width * 0.03,
// //       borderWidth: 1,
// //       borderColor: PALETTE.accentSoft,
// //     },
// //     resultBox: {
// //       alignItems: "center",
// //     },
// //     resultLabel: {
// //       fontSize: width * 0.035,
// //       color: PALETTE.textSecondary,
// //       marginBottom: 4,
// //     },
// //     resultValue: {
// //       fontSize: width * 0.06,
// //       fontWeight: "bold",
// //       color: PALETTE.accent,
// //     },
// //     label: {
// //       fontSize: width * 0.038,
// //       color: PALETTE.textPrimary,
// //       marginBottom: 6,
// //       marginTop: height * 0.015,
// //       marginLeft: 6,
// //     },
// //     inputContainer: {
// //       backgroundColor: PALETTE.inputBg,
// //       paddingHorizontal: width * 0.04,
// //       paddingVertical: height * 0.015,
// //       borderRadius: width * 0.025,
// //       marginBottom: height * 0.015,
// //       borderWidth: 1,
// //       borderColor: PALETTE.border,
// //     },
// //     input: {
// //       fontSize: width * 0.045,
// //       color: PALETTE.textPrimary,
// //     },
// //     buttonRow: {
// //       flexDirection: "row",
// //       justifyContent: "space-evenly",
// //       marginTop: height * 0.03,
// //     },
// //     buttonPrimary: {
// //       backgroundColor: PALETTE.accent,
// //       paddingVertical: height * 0.015,
// //       paddingHorizontal: width * 0.08,
// //       borderRadius: width * 0.025,
// //       minWidth: width * 0.3,
// //     },
// //     buttonSecondary: {
// //       backgroundColor: PALETTE.accentSoft,
// //       paddingVertical: height * 0.015,
// //       paddingHorizontal: width * 0.08,
// //       borderRadius: width * 0.025,
// //       minWidth: width * 0.3,
// //     },
// //     buttonText: {
// //       color: "#f9fafb",
// //       fontSize: width * 0.045,
// //       fontWeight: "600",
// //       textAlign: "center",
// //     },
// //   });

// // export default DetailsScreen;

// // DetailsScreen.js
// import { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Keyboard,
//   Alert,
//   useWindowDimensions,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// //import { AdMobBanner } from "expo-ads-admob";

// //const TEST_BANNER_ID = "ca-app-pub-3940256099942544/6300978111";
// //const BANNER_AD_UNIT_ID = TEST_BANNER_ID; // replace with real ID in production

// const DetailsScreen = ({ route }) => {
//   const { medicine } = route.params;
//   const [units, setUnit] = useState("");
//   const [times, setTimes] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [boxAnswer, setBoxAnswer] = useState("");
//   const [directions, setDirections] = useState("");

//   const { width, height } = useWindowDimensions();
//   const styles = createResponsiveStyles(width, height);

//   const handleChange = (text) => setUnit(text);
//   const handleChange2 = (text) => setTimes(text);

//   function pressHandler() {
//     Keyboard.dismiss();

//     if (units.trim() === "" || times.trim() === "") {
//       Alert.alert("Validation Error", "Please fill in both fields.");
//       return;
//     }

//     const effectivePrime = medicine.prime > 0 ? medicine.prime : 0;
//     const firstSum = Number(times) * Number(units);
//     const primeSum = Number(times) * effectivePrime;
//     const secondSum = firstSum + primeSum;

//     if (!secondSum || secondSum <= 0) {
//       Alert.alert("Input Error", "Please enter valid numeric values.");
//       return;
//     }

//     const sum = medicine.unitsInPen / secondSum;
//     const expire = medicine.expire;
//     const box = medicine.pensAmount > 0 ? medicine.pensAmount : 0;

//     const displayAnswer = sum > expire ? expire : sum;
//     const floorAnswer = Math.floor(displayAnswer);
//     setAnswer(floorAnswer);
//     setBoxAnswer(box ? floorAnswer * box : 0);
//     setDirections(medicine.dosage);
//   }

//   function resetHandler() {
//     Keyboard.dismiss();
//     setUnit("");
//     setTimes("");
//     setAnswer("");
//     setBoxAnswer("");
//     setDirections("");
//   }

//   return (
//     <LinearGradient colors={["#f7fafd", "#e2f1f3"]} style={styles.screen}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.inner}>
//           <ScrollView
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={styles.scrollContent}
//           >
//             <View style={styles.container}>
//               {/* Header Info */}
//               <Text style={styles.heading}>{medicine.name}</Text>
//               <Text style={styles.subHeading}>{medicine.addToName}</Text>
//               <Text style={styles.ndc}>{medicine.ndc}</Text>
//               {directions ? (
//                 <Text style={styles.directions}>{directions}</Text>
//               ) : null}

//               {/* Answer Section */}
//               {(answer || boxAnswer) && (
//                 <View style={styles.resultContainer}>
//                   {answer !== "" && (
//                     <View style={styles.resultBox}>
//                       <Text style={styles.resultLabel}>Days' supply:</Text>
//                       <Text style={styles.resultValue}>{answer}</Text>
//                     </View>
//                   )}
//                   {boxAnswer > 0 && (
//                     <View style={styles.resultBox}>
//                       <Text style={styles.resultLabel}>
//                         Days' supply per box:
//                       </Text>
//                       <Text style={styles.resultValue}>{boxAnswer}</Text>
//                     </View>
//                   )}
//                 </View>
//               )}

//               {/* Input Fields */}
//               <Text style={styles.label}>Units per dose:</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. 20"
//                   placeholderTextColor="#999"
//                   value={units}
//                   onChangeText={handleChange}
//                   keyboardType="numeric"
//                   returnKeyType="next"
//                 />
//               </View>

//               <Text style={styles.label}>Times per day:</Text>
//               <View style={styles.inputContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="e.g. 2"
//                   placeholderTextColor="#999"
//                   value={times}
//                   onChangeText={handleChange2}
//                   keyboardType="numeric"
//                 />
//               </View>

//               <View style={styles.buttonRow}>
//                 <TouchableOpacity
//                   onPress={pressHandler}
//                   style={styles.button}
//                   activeOpacity={0.75}
//                 >
//                   <Text style={styles.buttonText}>Confirm</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={resetHandler}
//                   style={styles.button}
//                   activeOpacity={0.75}
//                 >
//                   <Text style={styles.buttonText}>Reset</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>

//           {/* 🔹 Banner Ad at bottom of Details screen */}
//           <View style={styles.bannerContainer}>
//             {/* <AdMobBanner
//               bannerSize="smartBannerPortrait"
//               adUnitID={BANNER_AD_UNIT_ID}
//               servePersonalizedAds
//               onDidFailToReceiveAdWithError={(err) =>
//                 console.log("Details banner error:", err)
//               }
//             /> */}
//           </View>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const createResponsiveStyles = (width, height) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//     },
//     inner: {
//       flex: 1,
//     },
//     scrollContent: {
//       paddingBottom: height * 0.08, // leave room for banner
//     },
//     container: {
//       padding: width * 0.06,
//     },
//     heading: {
//       fontSize: width * 0.06,
//       fontWeight: "700",
//       color: "#06bcc1",
//       textAlign: "center",
//       marginBottom: height * 0.008,
//     },
//     subHeading: {
//       fontSize: width * 0.04,
//       color: "#4a7c7d",
//       textAlign: "center",
//       marginBottom: height * 0.005,
//     },
//     ndc: {
//       fontSize: width * 0.035,
//       color: "#999",
//       textAlign: "center",
//       marginBottom: height * 0.015,
//     },
//     directions: {
//       fontSize: width * 0.038,
//       color: "#cc0000",
//       textAlign: "center",
//       marginBottom: height * 0.02,
//       fontStyle: "italic",
//     },
//     resultContainer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       marginVertical: height * 0.02,
//       backgroundColor: "#f1f9fa",
//       padding: width * 0.04,
//       borderRadius: width * 0.03,
//       elevation: 3,
//     },
//     resultBox: {
//       alignItems: "center",
//     },
//     resultLabel: {
//       fontSize: width * 0.035,
//       color: "#444",
//       marginBottom: 4,
//     },
//     resultValue: {
//       fontSize: width * 0.06,
//       fontWeight: "bold",
//       color: "#cc0000",
//     },
//     label: {
//       fontSize: width * 0.038,
//       color: "#06bcc1",
//       marginBottom: 6,
//       marginTop: height * 0.015,
//       marginLeft: 6,
//     },
//     inputContainer: {
//       backgroundColor: "#fff",
//       paddingHorizontal: width * 0.04,
//       paddingVertical: height * 0.015,
//       borderRadius: width * 0.025,
//       marginBottom: height * 0.015,
//       elevation: 2,
//     },
//     input: {
//       fontSize: width * 0.045,
//       color: "#333",
//     },
//     buttonRow: {
//       flexDirection: "row",
//       justifyContent: "space-evenly",
//       marginTop: height * 0.03,
//     },
//     button: {
//       backgroundColor: "#06bcc1",
//       paddingVertical: height * 0.015,
//       paddingHorizontal: width * 0.08,
//       borderRadius: width * 0.025,
//       elevation: 2,
//       minWidth: width * 0.3,
// //     },
// //     buttonText: {
// //       color: "#fff",
// //       fontSize: width * 0.045,
// //       fontWeight: "600",
// //       textAlign: "center",
// //     },
// //     bannerContainer: {
// //       alignItems: "center",
// //       justifyContent: "center",
// //       paddingBottom: height * 0.015,
// //     },
// //   });

// // export default DetailsScreen;

// // DetailsScreen.js
// import { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Keyboard,
//   Alert,
//   useWindowDimensions,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const DetailsScreen = ({ route }) => {
//   // ✅ Safely get medicine (with fallback)
//   const medicine = route?.params?.medicine ?? null;

//   const [units, setUnit] = useState("");
//   const [times, setTimes] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [boxAnswer, setBoxAnswer] = useState("");
//   const [directions, setDirections] = useState("");

//   const { width, height } = useWindowDimensions();
//   const styles = createResponsiveStyles(width, height);

//   const handleChange = (text) => setUnit(text);
//   const handleChange2 = (text) => setTimes(text);

//   function pressHandler() {
//     Keyboard.dismiss();

//     if (!medicine) {
//       Alert.alert("Error", "Medicine data is missing.");
//       return;
//     }

//     if (units.trim() === "" || times.trim() === "") {
//       Alert.alert("Validation Error", "Please fill in both fields.");
//       return;
//     }

//     const effectivePrime =
//       medicine.prime && medicine.prime > 0 ? medicine.prime : 0;

//     const firstSum = Number(times) * Number(units);
//     const primeSum = Number(times) * effectivePrime;
//     const secondSum = firstSum + primeSum;

//     if (!secondSum || secondSum <= 0) {
//       Alert.alert("Error", "Please enter valid numbers.");
//       return;
//     }

//     const totalUnits = medicine.unitsInPen ?? 0;
//     const expire = medicine.expire ?? 0;
//     const pensAmount = medicine.pensAmount ?? 0;

//     const sum = totalUnits / secondSum;
//     const displayAnswer = expire ? Math.min(sum, expire) : sum;
//     const floorAnswer = Math.floor(displayAnswer);

//     setAnswer(floorAnswer);
//     setBoxAnswer(pensAmount ? floorAnswer * pensAmount : "");
//     setDirections(medicine.dosage ?? "");
//   }

//   function resetHandler() {
//     Keyboard.dismiss();
//     setUnit("");
//     setTimes("");
//     setAnswer("");
//     setBoxAnswer("");
//     setDirections("");
//   }

//   return (
//     <LinearGradient colors={["#020617", "#020617"]} style={styles.screen}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             {/* Header Info */}
//             <Text style={styles.heading}>{medicine?.name}</Text>
//             <Text style={styles.subHeading}>{medicine?.addToName}</Text>
//             <Text style={styles.ndc}>{medicine?.ndc}</Text>
//             {directions ? (
//               <Text style={styles.directions}>{directions}</Text>
//             ) : null}

//             {/* Answer Section */}
//             {(answer || boxAnswer) && (
//               <View style={styles.resultContainer}>
//                 {answer !== "" && (
//                   <View style={styles.resultBox}>
//                     <Text style={styles.resultLabel}>Days&apos; supply:</Text>
//                     <Text style={styles.resultValue}>{answer}</Text>
//                   </View>
//                 )}
//                 {boxAnswer !== "" && boxAnswer > 0 && (
//                   <View style={styles.resultBox}>
//                     <Text style={styles.resultLabel}>
//                       Days&apos; supply per box:
//                     </Text>
//                     <Text style={styles.resultValue}>{boxAnswer}</Text>
//                   </View>
//                 )}
//               </View>
//             )}

//             {/* Input Fields */}
//             <Text style={styles.label}>Units per dose:</Text>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="e.g. 2"
//                 placeholderTextColor="#6b7280"
//                 value={units}
//                 onChangeText={handleChange}
//                 keyboardType="numeric"
//                 returnKeyType="next"
//               />
//             </View>

//             <Text style={styles.label}>Times per day:</Text>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="e.g. 3"
//                 placeholderTextColor="#6b7280"
//                 value={times}
//                 onChangeText={handleChange2}
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.buttonRow}>
//               <TouchableOpacity
//                 onPress={pressHandler}
//                 style={styles.buttonPrimary}
//                 activeOpacity={0.75}
//               >
//                 <Text style={styles.buttonPrimaryText}>Confirm</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={resetHandler}
//                 style={styles.buttonSecondary}
//                 activeOpacity={0.75}
//               >
//                 <Text style={styles.buttonSecondaryText}>Reset</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const createResponsiveStyles = (width, height) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//     },
//     container: {
//       padding: width * 0.06,
//     },
//     heading: {
//       fontSize: width * 0.06,
//       fontWeight: "700",
//       color: "#e5e7eb",
//       textAlign: "center",
//       marginBottom: height * 0.008,
//     },
//     subHeading: {
//       fontSize: width * 0.04,
//       color: "#9ca3af",
//       textAlign: "center",
//       marginBottom: height * 0.005,
//     },
//     ndc: {
//       fontSize: width * 0.035,
//       color: "#dcdee1",
//       textAlign: "center",
//       marginBottom: height * 0.015,
//     },
//     directions: {
//       fontSize: width * 0.038,
//       color: "#f97316",
//       textAlign: "center",
//       marginBottom: height * 0.02,
//       fontStyle: "italic",
//     },
//     resultContainer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       marginVertical: height * 0.02,
//       backgroundColor: "#020617",
//       padding: width * 0.04,
//       borderRadius: width * 0.03,
//       borderWidth: 1,
//       borderColor: "#1f2937",
//     },
//     resultBox: {
//       alignItems: "center",
//     },
//     resultLabel: {
//       fontSize: width * 0.035,
//       color: "#9ca3af",
//       marginBottom: 4,
//     },
//     resultValue: {
//       fontSize: width * 0.08,
//       fontWeight: "bold",
//       color: "#facc15",
//     },
//     label: {
//       fontSize: width * 0.038,
//       color: "#e5e7eb",
//       marginBottom: 6,
//       marginTop: height * 0.015,
//       marginLeft: 6,
//     },
//     inputContainer: {
//       backgroundColor: "#020617",
//       paddingHorizontal: width * 0.04,
//       paddingVertical: height * 0.015,
//       borderRadius: width * 0.025,
//       marginBottom: height * 0.015,
//       borderWidth: 1,
//       borderColor: "#1f2937",
//     },
//     input: {
//       fontSize: width * 0.045,
//       color: "#e5e7eb",
//     },
//     buttonRow: {
//       flexDirection: "row",
//       justifyContent: "space-evenly",
//       marginTop: height * 0.03,
//     },
//     buttonPrimary: {
//       backgroundColor: "#22c55e",
//       paddingVertical: height * 0.015,
//       paddingHorizontal: width * 0.08,
//       borderRadius: width * 0.025,
//       minWidth: width * 0.3,
//     },
//     buttonPrimaryText: {
//       color: "#022c22",
//       fontSize: width * 0.045,
//       fontWeight: "600",
//       textAlign: "center",
//     },
//     buttonSecondary: {
//       borderColor: "#64748b",
//       borderWidth: 1,
//       paddingVertical: height * 0.015,
//       paddingHorizontal: width * 0.08,
//       borderRadius: width * 0.025,
//       minWidth: width * 0.3,
//     },
//     buttonSecondaryText: {
//       color: "#e5e7eb",
//       fontSize: width * 0.045,
//       fontWeight: "500",
//       textAlign: "center",
//     },
//   });

// export default DetailsScreen;

// DetailsScreen.js
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import { usePro } from "./context/ProContext";
//import AdBanner from "./components/AdBanner";

const DetailsScreen = ({ route }) => {
  const { medicine } = route.params;
  //const { isPro } = usePro(); // ✅ global Pro flag

  const [units, setUnit] = useState("");
  const [times, setTimes] = useState("");
  const [answer, setAnswer] = useState("");
  const [boxAnswer, setBoxAnswer] = useState("");
  const [directions, setDirections] = useState("");

  const { width, height } = useWindowDimensions();
  const styles = createResponsiveStyles(width, height);

  const handleChange = (text) => setUnit(text);
  const handleChange2 = (text) => setTimes(text);

  function pressHandler() {
    Keyboard.dismiss();

    if (units.trim() === "" || times.trim() === "") {
      Alert.alert("Validation Error", "Please fill in both fields.");
      return;
    }

    const effectivePrime =
      medicine?.prime && medicine.prime > 0 ? medicine.prime : 0;

    const firstSum = Number(times) * Number(units);
    const primeSum = Number(times) * effectivePrime;
    const secondSum = firstSum + primeSum;

    if (!secondSum || secondSum <= 0) {
      Alert.alert("Error", "Please enter valid numbers.");
      return;
    }

    const totalUnits = medicine?.unitsInPen ?? 0;
    const expire = medicine?.expire ?? 0;
    const pensAmount = medicine?.pensAmount ?? 0;

    const sum = totalUnits / secondSum;
    const displayAnswer = expire ? Math.min(sum, expire) : sum;
    const floorAnswer = Math.floor(displayAnswer);

    setAnswer(floorAnswer);
    setBoxAnswer(pensAmount ? floorAnswer * pensAmount : "");
    setDirections(medicine?.dosage ?? "");
  }

  function resetHandler() {
    Keyboard.dismiss();
    setUnit("");
    setTimes("");
    setAnswer("");
    setBoxAnswer("");
    setDirections("");
  }

  return (
    <LinearGradient colors={["#020617", "#020617"]} style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* Header Info */}
            <Text style={styles.heading}>{medicine?.name}</Text>
            <Text style={styles.subHeading}>{medicine?.addToName}</Text>
            <Text style={styles.ndc}>{medicine?.ndc}</Text>
            {directions ? (
              <Text style={styles.directions}>{directions}</Text>
            ) : null}

            {/* Answer Section */}
            {(answer || boxAnswer) && (
              <View style={styles.resultContainer}>
                {answer !== "" && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>Days&apos; supply:</Text>
                    <Text style={styles.resultValue}>{answer}</Text>
                  </View>
                )}
                {boxAnswer !== "" && boxAnswer > 0 && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>
                      Days&apos; supply per box:
                    </Text>
                    <Text style={styles.resultValue}>{boxAnswer}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Input Fields */}
            <Text style={styles.label}>Units per dose:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 20"
                placeholderTextColor="#6b7280"
                value={units}
                onChangeText={handleChange}
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>

            <Text style={styles.label}>Times per day:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2"
                placeholderTextColor="#6b7280"
                value={times}
                onChangeText={handleChange2}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={pressHandler}
                style={styles.buttonPrimary}
                activeOpacity={0.75}
              >
                <Text style={styles.buttonPrimaryText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={resetHandler}
                style={styles.buttonSecondary}
                activeOpacity={0.75}
              >
                <Text style={styles.buttonSecondaryText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Banner ad – Free only */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const createResponsiveStyles = (width, height) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      padding: width * 0.06,
    },
    heading: {
      fontSize: width * 0.06,
      fontWeight: "700",
      color: "#e5e7eb",
      textAlign: "center",
      marginBottom: height * 0.008,
    },
    subHeading: {
      fontSize: width * 0.04,
      color: "#9ca3af",
      textAlign: "center",
      marginBottom: height * 0.005,
    },
    ndc: {
      fontSize: width * 0.035,
      color: "#dcdee1",
      textAlign: "center",
      marginBottom: height * 0.015,
    },
    directions: {
      fontSize: width * 0.038,
      color: "#f97316",
      textAlign: "center",
      marginBottom: height * 0.02,
      fontStyle: "italic",
    },
    resultContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: height * 0.02,
      backgroundColor: "#020617",
      padding: width * 0.04,
      borderRadius: width * 0.03,
      borderWidth: 1,
      borderColor: "#1f2937",
    },
    resultBox: {
      alignItems: "center",
    },
    resultLabel: {
      fontSize: width * 0.035,
      color: "#9ca3af",
      marginBottom: 4,
    },
    resultValue: {
      fontSize: width * 0.08,
      fontWeight: "bold",
      color: "#facc15",
    },
    label: {
      fontSize: width * 0.038,
      color: "#e5e7eb",
      marginBottom: 6,
      marginTop: height * 0.015,
      marginLeft: 6,
    },
    inputContainer: {
      backgroundColor: "#020617",
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      borderRadius: width * 0.025,
      marginBottom: height * 0.015,
      borderWidth: 1,
      borderColor: "#1f2937",
    },
    input: {
      fontSize: width * 0.045,
      color: "#e5e7eb",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: height * 0.03,
    },
    buttonPrimary: {
      backgroundColor: "#22c55e",
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.08,
      borderRadius: width * 0.025,
      minWidth: width * 0.3,
    },
    buttonPrimaryText: {
      color: "#022c22",
      fontSize: width * 0.045,
      fontWeight: "600",
      textAlign: "center",
    },
    buttonSecondary: {
      borderColor: "#64748b",
      borderWidth: 1,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.08,
      borderRadius: width * 0.025,
      minWidth: width * 0.3,
    },
    buttonSecondaryText: {
      color: "#e5e7eb",
      fontSize: width * 0.045,
      fontWeight: "500",
      textAlign: "center",
    },
  });

export default DetailsScreen;
