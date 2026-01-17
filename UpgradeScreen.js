// UpgradeScreen.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import { usePro } from "./context/ProContext";

const TERMS_URL =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const PRIVACY_URL =
  "https://www.privacypolicies.com/live/11a1f1a8-c935-4857-91f0-cf9428648cdf";

export default function UpgradeScreen({ navigation }) {
  const { purchaseAnnual, isPurchasing } = usePro();
  const [busy, setBusy] = useState(false);

  // Keep these in one place so you don’t miss them in UI + reviewer tests
  const TRIAL_TEXT = useMemo(
    () => ({
      headline: "Unlock Unlimited Use",
      sub1: "Start your free trial to unlock the Days’ Supply calculator.",
      sub2: "Free trial available. Subscription required for full access.",
      sub3: "After the free trial ends, a yearly subscription of $2.99 will automatically renew unless canceled at least 24 hours before the end of the trial.",
      sub4: "You can manage or cancel your subscription anytime in your App Store account settings.",
    }),
    []
  );

  const openLink = async (url) => {
    try {
      // Opens an in-app Safari view with a “Done” button (back/close)
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        controlsColor: "#111827",
      });
    } catch (e) {
      Alert.alert("Unable to open link", "Please try again.");
    }
  };

  const handleStartTrial = async () => {
    if (busy || isPurchasing) return;

    setBusy(true);
    try {
      await purchaseAnnual();
      Alert.alert("Success", "You're upgraded! 🎉");
      navigation.goBack();
    } catch (e) {
      Alert.alert(
        "Subscription failed",
        e?.message ?? "Please try again in a moment."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <LinearGradient colors={["#0f172a", "#111827"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          keyboardShouldPersistTaps="handled" // ✅ Fix #2
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>{TRIAL_TEXT.headline}</Text>
          <Text style={styles.subtitle}>{TRIAL_TEXT.sub1}</Text>

          {/* ✅ Apple clarity: trial + paid + auto-renew + price */}
          <Text style={styles.subtitlesmall}>{TRIAL_TEXT.sub2}</Text>
          <Text style={styles.subtitlesmall}>{TRIAL_TEXT.sub3}</Text>
          <Text style={styles.subtitlesmall}>{TRIAL_TEXT.sub4}</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Yearly Pro</Text>
            <Text style={styles.cardText}>
              Unlimited calculations, priming included.
            </Text>
            <Text style={styles.price}>$2.99 / year</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleStartTrial}
            style={[
              styles.primaryButton, // ✅ Fix #4
              (busy || isPurchasing) && styles.primaryButtonDisabled,
            ]}
          >
            {busy || isPurchasing ? (
              <View style={styles.row}>
                <ActivityIndicator />
                <Text style={styles.primaryButtonText}> Starting…</Text>
              </View>
            ) : (
              <Text style={styles.primaryButtonText}>Start Free Trial</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Not Now</Text>
          </TouchableOpacity>

          {/* ✅ Legal links inside purchase flow (tap opens in-app browser with Done button) */}
          <View style={styles.links}>
            <Text style={styles.linksHeader}>Links</Text>

            <Text style={styles.link} onPress={() => openLink(TERMS_URL)}>
              Terms of Use (EULA)
            </Text>

            <Text style={styles.link} onPress={() => openLink(PRIVACY_URL)}>
              Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },

  // ✅ Fix #2: padding so taps aren’t near the edge
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.88)",
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 20,
  },
  subtitlesmall: {
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
    lineHeight: 18,
    marginTop: 6,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginTop: 18,
    marginBottom: 18,
  },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  cardText: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 8,
    lineHeight: 20,
  },
  price: {
    color: "#fff",
    marginTop: 12,
    fontSize: 20,
    fontWeight: "800",
  },

  // ✅ Fix #4: large tap target
  primaryButton: {
    minHeight: 56,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22c55e",
  },
  primaryButtonDisabled: { opacity: 0.75 },
  primaryButtonText: { color: "#0b1220", fontWeight: "800", fontSize: 16 },

  secondaryButton: {
    marginTop: 12,
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  secondaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  links: { marginTop: 20, gap: 10 },
  linksHeader: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  link: {
    color: "rgba(255,255,255,0.92)",
    textDecorationLine: "underline",
    fontSize: 13,
  },

  row: { flexDirection: "row", alignItems: "center" },
});
