import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Purchases, { PurchasesErrorCode } from "react-native-purchases";
import { usePro } from "./context/ProContext";

export default function UpgradeScreen({ navigation }) {
  const { purchaseAnnual, restore, isPurchasing } = usePro();

  const onSubscribe = async () => {
    try {
      await purchaseAnnual();

      // After success, go back to Home automatically
      navigation?.goBack?.();
    } catch (e) {
      // ✅ Proper cancel handling
      if (e?.code === PurchasesErrorCode.PurchaseCancelledError) return;

      Alert.alert("Subscription", e?.message || "Purchase failed.");
    }
  };

  const onRestore = async () => {
    try {
      await restore();
      navigation?.goBack?.();
    } catch (e) {
      Alert.alert("Restore Purchases", e?.message || "Restore failed.");
    }
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Unlock Unlimited Use</Text>
      <Text style={styles.subtitle}>
        Start your free trial to unlock audit-safe days’ supply calculations.
      </Text>

      <View style={styles.bullets}>
        <Text style={styles.bullet}>• 1-month free trial</Text>
        <Text style={styles.bullet}>• $1.99 per year</Text>
        <Text style={styles.bullet}>
          • Cancel anytime in Apple ID subscriptions
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primary}
        onPress={onSubscribe}
        disabled={isPurchasing}
        activeOpacity={0.85}
      >
        {isPurchasing ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.primaryText}>Start Free Trial</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondary}
        onPress={onRestore}
        disabled={isPurchasing}
        activeOpacity={0.85}
      >
        <Text style={styles.secondaryText}>Restore Purchases</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Payment will be charged to your Apple ID at confirmation of purchase.
        Subscription renews automatically unless canceled at least 24 hours
        before the end of the period.
      </Text>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation?.goBack?.()}
      >
        <Text style={styles.linkText}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 22,
    justifyContent: "center",
    backgroundColor: "#0b1220",
  },
  title: { fontSize: 28, fontWeight: "800", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 15, color: "#cbd5e1", lineHeight: 21 },
  bullets: { marginTop: 16, marginBottom: 20 },
  bullet: { color: "#e2e8f0", marginBottom: 6, fontSize: 15 },
  primary: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0ABDE3",
    marginTop: 6,
  },
  primaryText: { color: "#06202a", fontWeight: "800", fontSize: 16 },
  secondary: {
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#3C6382",
  },
  secondaryText: { color: "#e2e8f0", fontWeight: "700" },
  terms: {
    marginTop: 16,
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 16,
  },
  link: { alignItems: "center", marginTop: 16 },
  linkText: { color: "#94a3b8" },
});
