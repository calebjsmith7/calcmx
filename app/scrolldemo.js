import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const BG = require("../assets/background.png");
const iPadBG = require("../assets/background_ipad.png");
export default function ScrollScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  let adjWidth = width || 760;
  // Calculate proportional height based on your image's aspect ratio (760x5000)
  const imageHeight = (adjWidth * 5000) / 760;
  const ipadHeight = (adjWidth * 6270) / 1536;

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 30 }}
      >
        <Image
          source={width && width > 700 ? iPadBG : BG}
          style={{
            width: adjWidth,
            height: width && width > 700 ? ipadHeight : imageHeight,
          }}
          resizeMode="contain"
        />
      </ScrollView>

      <TouchableOpacity
        color="white"
        size="large"
        style={styles.fab}
        onPress={() => router.push("/")}
      >
        <Text
          style={{
            color: "white",
            fontSize: Dimensions.get("window").width > 700 ? 24 : 18,
            textAlign: "center",
          }}
        >
          تنظیم مجدد Reset App
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#6f0000",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});
