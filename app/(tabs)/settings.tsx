import { StyleSheet, Switch } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SelectDropdown from "react-native-select-dropdown";
import { ChevronDown, ChevronUp, Loader } from "lucide-react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import useCurrencies from "@/hooks/useCurrencies";
import useSettings from "@/hooks/useSettings";
import Languages from "@/constants/SupportedLanguages";
import { useTranslation } from "react-i18next";
import CurrencySelect from "@/components/currencySelect";
import { ColorScheme } from "@/types";

export default function Settings() {
  const { t } = useTranslation("app");
  const { currencies, loadingCurrencies } = useCurrencies();
  const {
    preferredCurrency,
    preferredLanguage,
    preferredTheme,
    setPreferredCurrency,
    setPreferredTheme,
    setPreferredLanguage,
  } = useSettings();
  const [isEnabled, setIsEnabled] = useState(preferredTheme === "dark");
  const toggleSwitch = () => {
    setIsEnabled((prev) => {
      setPreferredTheme(!prev ? "dark" : "light");
      return !prev;
    });
  };
  if (loadingCurrencies) {
    return <Loader />;
  }
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.fieldWrapper}>
        <ThemedText style={styles.fieldLabel}>
          {t("settings.darkMode")}
        </ThemedText>
        <Switch
          trackColor={{
            false: "#CCC",
            true: "#CCC",
          }}
          thumbColor={isEnabled ? "#0a7ea4" : "#687076"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </ThemedView>
      <ThemedView style={styles.fieldWrapper}>
        <ThemedText style={styles.fieldLabel}>
          {t("settings.currency")}
        </ThemedText>
        <CurrencySelect
          onSelect={(selectedItem, index) => {
            setPreferredCurrency(selectedItem.symbol);
          }}
          selectedCurrency={preferredCurrency}
          preferredTheme={preferredTheme as ColorScheme}
          currencies={currencies}
        />
      </ThemedView>
      <ThemedView style={styles.fieldWrapper}>
        <ThemedText style={styles.fieldLabel}>
          {t("settings.language")}
        </ThemedText>
        <SelectDropdown
          defaultValue={
            Languages.find((item) => item.name === preferredLanguage) ||
            Languages[0]
          }
          data={Languages}
          onSelect={(selectedItem, index) => {
            setPreferredLanguage(selectedItem.name);
          }}
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
                    `${selectedItem.flag} ${selectedItem.label}`) ||
                    "Select your language"}
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
                  {item.flag} {item.label}
                </ThemedText>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    alignContent: "center",
    display: "flex",
    height: "100%",
  },
  fieldWrapper: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    width: 110,
  },
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
