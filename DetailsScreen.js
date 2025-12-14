import { useState } from "react";
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
import { usePro } from "./context/ProContext";

function AdBannerPlaceholder() {
  return (
    <View
      style={{
        height: 50,
        borderRadius: 8,
        marginTop: 20,
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

// ⬇️ add `navigation` here
const DetailsScreen = ({ route, navigation }) => {
  const { medicine } = route?.params ?? {};
  const { isPro, trialExpired } = usePro();

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

    if (trialExpired && !isPro) {
      Alert.alert(
        "Trial ended",
        "Your one-month free trial has ended. Please subscribe to continue using the Days' Supply calculator."
      );
      return;
    }

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
            {/* ⬇️ Home button row */}
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("Home")} // make sure "Home" matches your route name
                activeOpacity={0.75}
              >
                <Text style={styles.homeButtonText}>Home</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading}>{medicine?.name}</Text>
            <Text style={styles.subHeading}>{medicine?.addToName}</Text>
            <Text style={styles.ndc}>{medicine?.ndc}</Text>
            {directions ? (
              <Text style={styles.directions}>{directions}</Text>
            ) : null}

            {(answer || boxAnswer) && (
              <View style={styles.resultContainer}>
                {answer !== "" && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>Days' supply:</Text>
                    <Text style={styles.resultValue}>{answer}</Text>
                  </View>
                )}
                {boxAnswer !== "" && boxAnswer > 0 && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>
                      Days' supply per box:
                    </Text>
                    <Text style={styles.resultValue}>{boxAnswer}</Text>
                  </View>
                )}
              </View>
            )}

            <Text style={styles.label}>Units per dose:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2"
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
                placeholder="e.g. 3"
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

            {!isPro && <AdBannerPlaceholder />}
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
    // ⬇️ new styles for header + home button
    headerRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: height * 0.015,
    },
    homeButton: {
      paddingVertical: height * 0.008,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.025,
      borderWidth: 1,
      borderColor: "#4b5563",
      backgroundColor: "#020617",
    },
    homeButtonText: {
      color: "#e5e7eb",
      fontSize: width * 0.04,
      fontWeight: "500",
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
