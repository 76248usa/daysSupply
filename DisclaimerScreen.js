import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function DisclaimerScreen({ navigation }) {
  return (
    <LinearGradient colors={["#0b1720", "#020617"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Disclaimer</Text>

          <Text style={styles.body}>
            This app is provided for informational and convenience purposes only
            and is not medical advice.
            {"\n\n"}
            Days’ supply calculations can vary by product, device, priming,
            discard dates, patient-specific directions, and payer/audit
            requirements.
            {"\n\n"}
            <Text style={styles.bold}>
              You must independently verify all inputs and results
            </Text>{" "}
            before dispensing or documenting days’ supply. The user assumes all
            responsibility for use of the app and any decisions made based on
            its output.
            {"\n\n"}
            If there is any discrepancy, follow the prescription directions,
            product labeling, and your organization’s policies/procedures.
          </Text>

          <TouchableOpacity
            style={styles.primary}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>I Understand</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingTop: 16 },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  body: { fontSize: 16, lineHeight: 24, color: "#cbd5e1" },
  bold: { fontWeight: "900", color: "#ffffff" },
  primary: {
    marginTop: 20,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0ABDE3",
  },
  primaryText: { color: "#06202a", fontWeight: "900", fontSize: 16 },
});
