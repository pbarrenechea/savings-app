import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { Trash } from "lucide-react-native";
import useSettings from "@/hooks/useSettings";
import { useRouter } from "expo-router";
import type { SavingDataProps } from "@/types";
import { convertTo, formatNumber } from "@/utils/conversions";
import { useTranslation } from "react-i18next";
import useCurrencies from "@/hooks/useCurrencies";

interface SavingItemProps extends SavingDataProps {
  deletionHandler: (id: string) => void;
}

const SavingItem = ({
  id,
  name,
  value,
  currency,
  deletionHandler,
}: SavingItemProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { preferredTheme: theme, preferredCurrency } = useSettings();
  const { currencies } = useCurrencies();
  const currentCurrency = currencies.find((item) => item.symbol === currency);
  const preferredCurrencyItem = currencies.find(
    (item) => item.symbol === preferredCurrency,
  );
  const handleDelete = () => {
    Alert.alert(t("savings.deleteMessage"), "", [
      {
        text: t("buttons.cancel"),
        onPress: () => {},
        style: "cancel",
      },
      {
        text: t("buttons.confirm"),
        onPress: () => {
          deletionHandler(id);
        },
      },
    ]);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(savings)/manageSaving?id=${id}`);
      }}
    >
      <ThemedView
        style={[
          styles.savingContainer,
          {
            borderColor: Colors[theme ?? "light"].primaryColor,
            shadowColor: Colors[theme ?? "light"].primaryColor,
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
        ]}
      >
        <View style={styles.savingWrapper}>
          <View style={styles.dataContainer}>
            <ThemedText
              style={{
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              {name}
            </ThemedText>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <ThemedText
                style={{
                  fontWeight: "600",
                  fontSize: 14,
                  width: 100,
                }}
              >
                {t("savings.original")}:
              </ThemedText>
              <ThemedText style={{ fontSize: 14 }}>
                {currentCurrency.icon}
                {currentCurrency.symbol} {formatNumber(value)}
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <ThemedText
                style={{
                  fontWeight: "600",
                  fontSize: 14,
                  width: 100,
                }}
              >
                {t("savings.conversion")}:
              </ThemedText>
              <ThemedText style={{ fontSize: 14 }}>
                {preferredCurrencyItem.icon}
                {preferredCurrency}{" "}
                {formatNumber(
                  convertTo(currencies, preferredCurrency, currency, value),
                )}
              </ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={handleDelete}>
              <Trash size={28} color={"#0a7ea4"} />
            </Button>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  savingContainer: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  savingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dataContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    width: 40,
    height: 40,
  },
});

export default SavingItem;
