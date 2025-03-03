import { Pressable, View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  mode?: string;
  style?: any;
}

const Button = ({ children, onPress, mode, style }: ButtonProps) => {
  const colorScheme = useColorScheme();
  return (
    <View style={style || {}}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed && {
            ...styles.pressed,
            backgroundColor: Colors[colorScheme ?? "light"].inactiveColor,
          }
        }
      >
        <View
          style={[
            { borderColor: Colors[colorScheme ?? "light"].primaryColor },
            mode === "flat"
              ? { backgroundColor: Colors[colorScheme ?? "light"].background }
              : {
                  backgroundColor: Colors[colorScheme ?? "light"].primaryColor,
                },
            styles.button,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  mode === "flat"
                    ? Colors[colorScheme ?? "light"].primaryColor
                    : "#FFF",
              },
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});

export default Button;
