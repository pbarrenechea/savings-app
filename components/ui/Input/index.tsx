import {
  View,
  TextInput,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
export interface InputProps {
  label: string;
  style?: any;
  textInputConfig: any;
  invalid?: boolean;
}

const Input = ({ label, style, textInputConfig, invalid }: InputProps) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const inputStyles = [
    styles.input,
    textInputConfig && textInputConfig.multiline && styles.inputMultiline,
  ];
  return (
    <View style={[styles.inputContainer, style]}>
      <Text
        style={[styles.label, { color: Colors[colorScheme ?? "light"].text }]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          inputStyles,
          invalid && styles.invalidInput,
          {
            backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
            color: Colors[colorScheme ?? "light"].text,
          },
        ]}
        {...textInputConfig}
      />
      {invalid && (
        <Text style={styles.errorText}>
          {label} {t("errors.notValid")}.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: "auto",
    marginVertical: 8,
    width: "80%",
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    textAlign: "left",
    color: "#a50909",
    margin: 8,
    fontWeight: "bold",
  },
  invalidInput: {
    backgroundColor: "#fcc4e4",
  },
});

export default Input;
