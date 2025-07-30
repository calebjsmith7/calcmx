import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function CalculatorScreen() {
  const router = useRouter();
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const { width, height } = useWindowDimensions();
  const isTablet =
    (Platform.OS === "ios" && Platform.isPad) || Math.min(width, height) >= 600;

  const handleTap = (type, value) => {
    // DELETE (backspace)
    if (type === "delete") {
      setDisplay((prev) => {
        if (waitingForSecond) return "0"; // if we were entering second operand, clear to zero
        if (prev.length <= 1) return "0"; // single digit → reset to zero
        return prev.slice(0, -1); // chop off last char
      });
      return;
    }
    if (type === "number") {
      setDisplay((prev) => {
        // compute next display
        const next =
          prev === "0" || waitingForSecond ? String(value) : prev + value;

        // secret 7777 combo
        if (next === "777") {
          router.push("scrolldemo");
        }

        // secret delete data combo
        if (next === "666") {
          Alert.alert("Your data has been deleted");
        }

        return next;
      });
      setWaitingForSecond(false);
    }
    if (type === "operator") {
      if (!waitingForSecond) {
        setOperator(value);
        setFirstValue(parseFloat(display));
        setWaitingForSecond(true);
      }
    }
    if (type === "equal") {
      const secondValue = parseFloat(display);
      let result = 0;
      switch (operator) {
        case "+":
          result = firstValue + secondValue;
          break;
        case "-":
          result = firstValue - secondValue;
          break;
        case "×":
          result = firstValue * secondValue;
          break;
        case "÷":
          result = firstValue / secondValue;
          break;
      }
      setDisplay(String(result));
      setOperator(null);
      setWaitingForSecond(false);
    }
    if (type === "clear") {
      setDisplay("0");
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };

  const buttons = [
    ["<", "AC", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["+/-", "0", ".", "="],
  ];

  return (
    <SafeAreaView style={styles.calcContainer}>
      <View
        style={[
          styles.displayContainer,
          isTablet && styles.displayContainerTablet,
        ]}
      >
        <Text
          style={[styles.displayText, isTablet && styles.displayTextTablet]}
        >
          {display}
        </Text>
      </View>
      <View
        style={[
          styles.buttonsContainer,
          isTablet && styles.buttonsContainerTablet,
        ]}
      >
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={[styles.row]}>
            {row.map((btn) => {
              const isOperator = ["÷", "×", "-", "+", "="].includes(btn);
              const type =
                btn === "<"
                  ? "delete"
                  : btn === "AC"
                  ? "clear"
                  : isOperator
                  ? btn === "="
                    ? "equal"
                    : "operator"
                  : /\d/.test(btn) || btn === "."
                  ? "number"
                  : "modifier";

              return (
                <TouchableOpacity
                  key={btn}
                  style={[styles.button, isOperator && styles.operatorButton]}
                  onPress={() => handleTap(type, btn)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isOperator && styles.operatorText,
                      isTablet && styles.buttonTextTablet,
                    ]}
                  >
                    {btn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calcContainer: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
  },
  displayContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  displayContainerTablet: { flex: 0.12, paddingHorizontal: 80 },
  buttonsContainer: {
    flex: 1,
  },
  buttonsContainerTablet: {
    paddingHorizontal: 60, // Add horizontal padding to shrink button area
  },
  displayText: {
    fontSize: 60,
    color: "#fff",
  },
  displayTextTablet: {
    fontSize: 90,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },

  button: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#333",
    margin: 5,
  },

  buttonText: {
    fontSize: 32,
    color: "#fff",
  },
  buttonTextTablet: { fontSize: 48 },
  operatorButton: {
    backgroundColor: "#ff9500",
  },
  operatorText: {
    color: "#fff",
  },
});
