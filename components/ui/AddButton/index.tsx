import { TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Plus } from "lucide-react-native";

interface AddButtonProps {
  handler: () => void;
}

const AddButton = ({ handler }: AddButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.floatingButton,
        {
          backgroundColor: Colors[colorScheme ?? "light"].primaryColor,
          shadowColor: Colors[colorScheme ?? "light"].text,
        },
      ]}
      onPress={handler}
    >
      <Plus color={"#FFFFFF"} size={28} />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 60,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
