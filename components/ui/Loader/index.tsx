import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, ActivityIndicator, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
const Loader = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Colors[colorScheme ?? "light"].primaryColor}
      />
    </ThemedView>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
