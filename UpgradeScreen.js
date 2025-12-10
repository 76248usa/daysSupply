// // screens/UpgradeScreen.js
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   useWindowDimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";

// const UpgradeScreen = ({ navigation }) => {
//   const { width, height } = useWindowDimensions();
//   const styles = createStyles(width, height);

//   const handleUpgradePress = () => {
//     // TODO: Hook into your in-app purchase / subscription flow here
//     // For now you can just navigate back or show a placeholder
//     navigation.goBack();
//   };

//   return (
//     <LinearGradient colors={["#0b1725", "#05080d"]} style={styles.screen}>
//       <SafeAreaView style={styles.safeArea}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <Text style={styles.tag}>PRO UPGRADE</Text>

//           <Text style={styles.title}>Same Powerful App.{"\n"}Zero Ads.</Text>

//           <Text style={styles.subtitle}>
//             Remove all ads and enjoy a clean, distraction-free insulin days'
//             supply calculator built for busy pharmacists.
//           </Text>

//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>What you get with Pro</Text>

//             <View style={styles.bulletRow}>
//               <Text style={styles.bulletIcon}>🧘</Text>
//               <Text style={styles.bulletText}>
//                 <Text style={styles.bulletStrong}>Ad-free experience</Text> – no
//                 banners or interstitials, ever.
//               </Text>
//             </View>

//             <View style={styles.bulletRow}>
//               <Text style={styles.bulletIcon}>⚕️</Text>
//               <Text style={styles.bulletText}>
//                 <Text style={styles.bulletStrong}>Fewer distractions</Text>{" "}
//                 during audits and high-volume shifts.
//               </Text>
//             </View>

//             <View style={styles.bulletRow}>
//               <Text style={styles.bulletIcon}>⏱️</Text>
//               <Text style={styles.bulletText}>
//                 <Text style={styles.bulletStrong}>Faster workflow</Text> – jump
//                 between calculations without ad interruptions.
//               </Text>
//             </View>

//             <View style={styles.bulletRow}>
//               <Text style={styles.bulletIcon}>💊</Text>
//               <Text style={styles.bulletText}>
//                 <Text style={styles.bulletStrong}>
//                   Support a pharmacist-built tool
//                 </Text>{" "}
//                 – created specifically for insulin audits and day-supply.
//               </Text>
//             </View>
//           </View>

//           <View style={styles.priceBox}>
//             <Text style={styles.priceMain}>$4.99 / year</Text>
//             <Text style={styles.priceNote}>
//               One simple yearly payment for an ad-free experience.
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={styles.primaryButton}
//             activeOpacity={0.85}
//             onPress={handleUpgradePress}
//           >
//             <Text style={styles.primaryButtonText}>Upgrade to Pro</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.secondaryButton}
//             activeOpacity={0.8}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.secondaryButtonText}>Keep Free Version</Text>
//           </TouchableOpacity>

//           <Text style={styles.footerNote}>
//             You can continue using the free version with ads at any time.
//           </Text>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const createStyles = (width, height) =>
//   StyleSheet.create({
//     screen: {
//       flex: 1,
//     },
//     safeArea: {
//       flex: 1,
//     },
//     container: {
//       paddingHorizontal: width * 0.06,
//       paddingVertical: height * 0.03,
//     },
//     tag: {
//       color: "#7dd3fc",
//       fontSize: width * 0.035,
//       fontWeight: "600",
//       letterSpacing: 1.5,
//       marginBottom: height * 0.01,
//       textTransform: "uppercase",
//     },
//     title: {
//       color: "#f9fafb",
//       fontSize: width * 0.07,
//       fontWeight: "700",
//       marginBottom: height * 0.015,
//     },
//     subtitle: {
//       color: "#cbd5f5",
//       fontSize: width * 0.04,
//       lineHeight: width * 0.055,
//       marginBottom: height * 0.03,
//     },
//     card: {
//       backgroundColor: "#0f172a",
//       borderRadius: width * 0.04,
//       paddingHorizontal: width * 0.05,
//       paddingVertical: height * 0.02,
//       marginBottom: height * 0.03,
//       borderWidth: 1,
//       borderColor: "#1f2937",
//     },
//     cardTitle: {
//       color: "#e5e7eb",
//       fontSize: width * 0.045,
//       fontWeight: "600",
//       marginBottom: height * 0.015,
//     },
//     bulletRow: {
//       flexDirection: "row",
//       alignItems: "flex-start",
//       marginBottom: height * 0.01,
//     },
//     bulletIcon: {
//       fontSize: width * 0.055,
//       marginRight: width * 0.02,
//       marginTop: 2,
//     },
//     bulletText: {
//       flex: 1,
//       color: "#d1d5db",
//       fontSize: width * 0.038,
//       lineHeight: width * 0.052,
//     },
//     bulletStrong: {
//       fontWeight: "600",
//       color: "#f3f4f6",
//     },
//     priceBox: {
//       alignItems: "flex-start",
//       marginBottom: height * 0.025,
//     },
//     priceMain: {
//       color: "#f9fafb",
//       fontSize: width * 0.06,
//       fontWeight: "700",
//     },
//     priceNote: {
//       color: "#9ca3af",
//       fontSize: width * 0.037,
//       marginTop: 4,
//     },
//     primaryButton: {
//       backgroundColor: "#06bcc1",
//       paddingVertical: height * 0.017,
//       borderRadius: width * 0.03,
//       alignItems: "center",
//       marginBottom: height * 0.015,
//     },
//     primaryButtonText: {
//       color: "#0b1120",
//       fontSize: width * 0.045,
//       fontWeight: "700",
//     },
//     secondaryButton: {
//       borderWidth: 1,
//       borderColor: "#4b5563",
//       paddingVertical: height * 0.016,
//       borderRadius: width * 0.03,
//       alignItems: "center",
//       marginBottom: height * 0.015,
//     },
//     secondaryButtonText: {
//       color: "#e5e7eb",
//       fontSize: width * 0.042,
//       fontWeight: "500",
//     },
//     footerNote: {
//       color: "#6b7280",
//       fontSize: width * 0.035,
//       textAlign: "center",
//       marginTop: height * 0.005,
//     },
//   });

// export default UpgradeScreen;

// screens/UpgradeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const UpgradeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const styles = createStyles(width, height);

  // NOTE: This button is just UI.
  // Later you’ll hook this up to StoreKit / RevenueCat / your purchase handler.
  const handleUpgradePress = () => {
    // TODO: implement purchase logic
    // For now, maybe just navigate back:
    // navigation.goBack();
  };

  return (
    <LinearGradient colors={["#020617", "#0b1724"]} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={styles.badge}>PRO VERSION</Text>
          <Text style={styles.title}>Remove Ads. Keep Your Focus.</Text>
          <Text style={styles.subtitle}>
            Designed for busy pharmacists handling insulin audits and day-supply
            checks all day long.
          </Text>

          {/* Price box */}
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>Intro pricing</Text>
            <Text style={styles.priceValue}>$4.99 / year</Text>
            <Text style={styles.priceNote}>
              One low yearly price per pharmacist. Changeable later in App Store
              Connect.
            </Text>
          </View>

          {/* Benefits list */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What you get with Pro</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bulletIcon}>✅</Text>
              <Text style={styles.bulletText}>
                100% ad-free experience on all calculators
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bulletIcon}>⚡</Text>
              <Text style={styles.bulletText}>
                Faster workflow: no waiting for interstitials to finish
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bulletIcon}>📊</Text>
              <Text style={styles.bulletText}>
                Clean, distraction-free UI when doing audit-critical math
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bulletIcon}>🏥</Text>
              <Text style={styles.bulletText}>
                Ideal for corporate use in high-volume pharmacies
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bulletIcon}>🔐</Text>
              <Text style={styles.bulletText}>
                No patient data is stored or shared – pure calculator logic
              </Text>
            </View>
          </View>

          {/* CTA buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.9}
              onPress={handleUpgradePress}
            >
              <Text style={styles.primaryButtonText}>Upgrade to Pro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Maybe later</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Actual purchase, subscription, and restore-purchase behavior will be
            handled via App Store in-app purchases. This screen is your
            marketing and “confirm upgrade” UI.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const createStyles = (width, height) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    container: {
      paddingHorizontal: width * 0.06,
      paddingVertical: height * 0.03,
    },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: "#4f46e5",
      color: "#e5e7eb",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 12,
    },
    title: {
      fontSize: width * 0.07,
      fontWeight: "700",
      color: "#f9fafb",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: width * 0.04,
      color: "#9ca3af",
      marginBottom: height * 0.03,
    },

    priceCard: {
      backgroundColor: "#020617",
      borderRadius: width * 0.04,
      padding: width * 0.05,
      borderWidth: 1,
      borderColor: "#4f46e5",
      marginBottom: height * 0.03,
    },
    priceLabel: {
      color: "#9ca3af",
      fontSize: width * 0.035,
      marginBottom: 4,
    },
    priceValue: {
      color: "#e5e7eb",
      fontSize: width * 0.07,
      fontWeight: "700",
      marginBottom: 4,
    },
    priceNote: {
      color: "#9ca3af",
      fontSize: width * 0.032,
    },

    section: {
      marginBottom: height * 0.03,
    },
    sectionTitle: {
      color: "#e5e7eb",
      fontSize: width * 0.045,
      fontWeight: "600",
      marginBottom: 10,
    },
    bulletRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    bulletIcon: {
      width: 24,
      fontSize: 18,
      marginTop: 2,
    },
    bulletText: {
      flex: 1,
      color: "#d1d5db",
      fontSize: width * 0.036,
    },

    buttonRow: {
      marginTop: height * 0.01,
      marginBottom: height * 0.02,
    },
    primaryButton: {
      backgroundColor: "#4f46e5",
      paddingVertical: height * 0.016,
      borderRadius: width * 0.03,
      alignItems: "center",
      marginBottom: 10,
    },
    primaryButtonText: {
      color: "#f9fafb",
      fontSize: width * 0.045,
      fontWeight: "700",
    },
    secondaryButton: {
      paddingVertical: height * 0.014,
      borderRadius: width * 0.03,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#4b5563",
    },
    secondaryButtonText: {
      color: "#e5e7eb",
      fontSize: width * 0.04,
    },
    disclaimer: {
      fontSize: width * 0.03,
      color: "#6b7280",
      marginTop: 8,
    },
  });

export default UpgradeScreen;
