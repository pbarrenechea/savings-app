import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Sidebar = ({
  setSidebarVisibility,
}: {
  setSidebarVisibility: (visibility: boolean) => void;
}) => {
  const sidebarX = new Animated.Value(SCREEN_WIDTH * 0.1); // Sidebar starts off-screen
  const openSidebar = () => {
    setSidebarVisibility(true);
    Animated.timing(sidebarX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSidebarVisibility(false));
  };

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={closeSidebar} // Close the menu if the user taps outside
      activeOpacity={1}
    >
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: sidebarX }] }]}
      >
        <ThemedText
          style={styles.sidebarItem}
          onPress={() => alert("Option 1")}
        >
          Option 1
        </ThemedText>
        <ThemedText
          style={styles.sidebarItem}
          onPress={() => alert("Option 2")}
        >
          Option 2
        </ThemedText>
        <ThemedText
          style={styles.sidebarItem}
          onPress={() => alert("Option 3")}
        >
          Option 3
        </ThemedText>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Sidebar;
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: "white",
    padding: 20,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333",
  },
});
