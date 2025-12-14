import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { medicineData } from "./data/MedicineData";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { usePro } from "./context/ProContext"; // ⬅️ new

function AdBannerPlaceholder() {
  return (
    <View
      style={{
        height: 50,
        borderRadius: 8,
        marginTop: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#444",
      }}
    >
      <Text style={{ color: "#aaa", fontSize: 12 }}>Ad banner here</Text>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const { width, height } = useWindowDimensions();
  const { isPro, trialExpired, daysLeft } = usePro(); // ⬅️ from context

  const filteredItems = medicineData.filter((item) =>
    item?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  useFocusEffect(
    React.useCallback(() => {
      setSearchText("");
    }, [])
  );

  const styles = createStyles(width, height);

  return (
    <LinearGradient colors={["#0b1720", "#020617"]} style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.appTitle}>Insulin Days’ Supply</Text>
            <Text style={styles.appSubtitle}>
              Fast day-supply & audit-safe calculations
            </Text>

            {/* Trial / Pro status row */}
            <View style={styles.proRow}>
              <Text style={styles.proStatusText}>
                {isPro
                  ? "PRO active"
                  : trialExpired
                  ? "Trial ended – upgrade required"
                  : `Free trial: ${daysLeft} day(s) left`}
              </Text>
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
              />
            </View>

            {/* Medicine Buttons */}
            <View style={styles.resultsContainer}>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("Details", {
                      medicine: item,
                    })
                  }
                  activeOpacity={0.7}
                  style={styles.card}
                >
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.addToName ? (
                    <Text style={styles.cardSubtitle}>{item.addToName}</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            {/* Optional ad placeholder for now */}
            {!isPro && <AdBannerPlaceholder />}
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
      fontWeight: "700",
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
      marginBottom: height * 0.015,
    },
    proStatusText: {
      color: "#9ca3af",
      fontSize: width * 0.035,
      textAlign: "center",
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
      fontWeight: "600",
      textAlign: "center",
    },
    cardSubtitle: {
      color: "#c5c8cd",
      fontSize: width * 0.035,
      marginTop: height * 0.005,
      textAlign: "center",
    },
  });

export default HomeScreen;
