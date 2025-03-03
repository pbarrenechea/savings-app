import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";
import { CurrencyDataProps } from "@/types";

interface CurrencySelectProps {
  onSelect: (selectedItem: any, index: number) => void;
  selectedCurrency: string;
  preferredTheme: "light" | "dark";
  currencies: CurrencyDataProps[];
}

const CurrencySelect = ({
  onSelect,
  selectedCurrency,
  preferredTheme,
  currencies,
}: CurrencySelectProps) => {
  return (
    <>
      <SelectDropdown
        defaultValue={
          currencies.find((item) => item.symbol === selectedCurrency) ||
          currencies[0]
        }
        data={currencies}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <ThemedView
              style={[
                styles.dropdownButtonStyle,
                {
                  backgroundColor:
                    Colors[preferredTheme ?? "light"].backgroundSecondary,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.dropdownButtonTxtStyle,
                  { color: Colors[preferredTheme ?? "light"].text },
                ]}
              >
                {(selectedItem &&
                  `${selectedItem.icon} ${selectedItem.symbol}`) ||
                  "Select your currency"}
              </ThemedText>
              {isOpened ? <ChevronUp /> : <ChevronDown />}
            </ThemedView>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <ThemedView
              style={{
                ...styles.dropdownItemStyle,
                backgroundColor:
                  Colors[preferredTheme ?? "light"].backgroundSecondary,
                ...(isSelected && {
                  backgroundColor:
                    Colors[preferredTheme ?? "light"].backgroundThird,
                }),
              }}
            >
              <ThemedText
                style={[
                  styles.dropdownItemTxtStyle,
                  { color: Colors[preferredTheme ?? "light"].text },
                ]}
              >
                {item.icon} {item.symbol}
              </ThemedText>
            </ThemedView>
          );
        }}
      />
    </>
  );
};

export default CurrencySelect;

const styles = StyleSheet.create({
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonStyle: {
    width: 150,
    height: 40,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
  },
});
