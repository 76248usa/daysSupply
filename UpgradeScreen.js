// UpgradeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const UpgradeScreen = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();
  const styles = createStyles(width, height);

  // In the future, you'll check real entitlement here (RevenueCat / StoreKit2)
  const isPro = route?.params?.isPro ?? false;

  const handleSubscribePress = () => {
    // 🔐 TODO: Replace this with real purchase flow later.
    Alert.alert(
      "Subscription (placeholder)",
      "Here you’ll start the App Store subscription flow.",
      [
        {
          text: "OK",
          onPress: () => {
            // For now, pretend the user became Pro
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                  params: { isPro: true },
                },
              ],
            });
          },
        },
      ]
    );
  };

  const handleRestorePress = () => {
    // 🔐 TODO: Implement "restore purchases" later.
    Alert.alert(
      "Restore Purchases",
      "This will restore your subscription once billing is implemented."
    );
  };

  return (
    <LinearGradient colors={["#020617", "#020617"]} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top bar with Back */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.tagline}>Upgrade to Pro</Text>
          <Text style={styles.title}>
            Unlimited Days’ Supply\nAfter Your Free Trial
          </Text>

          <Text style={styles.subtitle}>
            Start with a 1-month free trial. Keep using it for{" "}
            <Text style={styles.subtitleHighlight}>
              fast, audit-safe insulin day-supply
            </Text>{" "}
            calculations every day.
          </Text>

          {/* Benefits list */}
          <View style={styles.benefitsBox}>
            <Text style={styles.benefitHeader}>What you get with Pro:</Text>

            <View style={styles.benefitRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Unlimited use – no limits on calculations
              </Text>
            </View>

            <View style={styles.benefitRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Insulin-specific logic (units, prime, expiration)
              </Text>
            </View>

            <View style={styles.benefitRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Designed for pharmacist audit & day-supply accuracy
              </Text>
            </View>

            <View style={styles.benefitRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Priority updates as NDCs and products change
              </Text>
            </View>
          </View>

          {/* Pricing line – just text for now */}
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Planned subscription</Text>
            <Text style={styles.priceValue}>$X.XX / month</Text>
            <Text style={styles.priceNote}>
              First month free • Cancel anytime
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubscribePress}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>
                Start Free Month & Subscribe
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRestorePress}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Restore Purchases</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tertiaryButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.tertiaryButtonText}>Not now</Text>
            </TouchableOpacity>
          </View>

          {isPro && (
            <Text style={styles.proHint}>
              Pro is already active on this device.
            </Text>
          )}
        </View>
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
    headerRow: {
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.01,
    },
    backText: {
      color: "#e5e7eb",
      fontSize: width * 0.04,
    },
    container: {
      flex: 1,
      paddingHorizontal: width * 0.07,
      paddingTop: height * 0.01,
    },
    tagline: {
      color: "#22c55e",
      fontSize: width * 0.038,
      fontWeight: "600",
      marginBottom: 4,
    },
    title: {
      color: "#f9fafb",
      fontSize: width * 0.07,
      fontWeight: "700",
      marginBottom: height * 0.015,
    },
    subtitle: {
      color: "#9ca3af",
      fontSize: width * 0.038,
      marginBottom: height * 0.02,
    },
    subtitleHighlight: {
      color: "#e5e7eb",
      fontWeight: "600",
    },
    benefitsBox: {
      backgroundColor: "#020617",
      borderRadius: 16,
      paddingVertical: height * 0.018,
      paddingHorizontal: width * 0.04,
      borderWidth: 1,
      borderColor: "#1f2937",
      marginBottom: height * 0.02,
    },
    benefitHeader: {
      color: "#e5e7eb",
      fontSize: width * 0.04,
      fontWeight: "600",
      marginBottom: height * 0.01,
    },
    benefitRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    bullet: {
      color: "#22c55e",
      fontSize: width * 0.05,
      marginRight: 6,
      marginTop: -2,
    },
    benefitText: {
      color: "#cbd5f5",
      fontSize: width * 0.036,
      flex: 1,
    },
    priceBox: {
      alignItems: "center",
      marginBottom: height * 0.025,
    },
    priceLabel: {
      color: "#9ca3af",
      fontSize: width * 0.035,
    },
    priceValue: {
      color: "#fbbf24",
      fontSize: width * 0.06,
      fontWeight: "700",
      marginVertical: 4,
    },
    priceNote: {
      color: "#9ca3af",
      fontSize: width * 0.033,
    },
    buttonColumn: {
      gap: 10,
      marginBottom: height * 0.015,
    },
    primaryButton: {
      backgroundColor: "#22c55e",
      paddingVertical: height * 0.015,
      borderRadius: 999,
      alignItems: "center",
    },
    primaryButtonText: {
      color: "#022c22",
      fontSize: width * 0.045,
      fontWeight: "700",
      textAlign: "center",
    },
    secondaryButton: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#4b5563",
      paddingVertical: height * 0.013,
      alignItems: "center",
    },
    secondaryButtonText: {
      color: "#e5e7eb",
      fontSize: width * 0.04,
      fontWeight: "500",
    },
    tertiaryButton: {
      paddingVertical: height * 0.012,
      alignItems: "center",
    },
    tertiaryButtonText: {
      color: "#9ca3af",
      fontSize: width * 0.038,
    },
    proHint: {
      marginTop: height * 0.015,
      textAlign: "center",
      color: "#4ade80",
      fontSize: width * 0.035,
    },
  });

export default UpgradeScreen;
