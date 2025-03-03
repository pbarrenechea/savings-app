import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Button from "@/components/ui/Button";
import { Trash } from "lucide-react-native";
import useSettings from "@/hooks/useSettings";
import { useRouter } from "expo-router";

import type { CurrencyDataProps } from "@/types";
import useCurrencies from "@/hooks/useCurrencies";
import { convertTo } from "@/utils/conversions";
import { useTranslation } from "react-i18next";

interface CurrencyItemProps extends CurrencyDataProps {
  deletionHandler: (id: string) => void;
}

const CurrencyItem = ({
  id,
  name,
  symbol,
  icon,
  referenceValue,
  deletionHandler,
}: CurrencyItemProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { preferredTheme: theme, preferredCurrency } = useSettings();
  const { currencies } = useCurrencies();
  const handleDelete = () => {
    Alert.alert(t("currencies.deleteMessage"), "", [
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
        if (preferredCurrency !== symbol) {
          router.push(`/(currencies)/manageCurrency?id=${id}`);
        }
      }}
    >
      <ThemedView
        style={[
          styles.currencyContainer,
          {
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowColor: Colors[theme ?? "light"].primaryColor,
            borderColor: Colors[theme ?? "light"].primaryColor,
            backgroundColor:
              preferredCurrency === symbol
                ? Colors[theme ?? "light"].primaryColor
                : "transparent",
          },
        ]}
      >
        <View style={styles.currencyWrapper}>
          <View style={styles.dataContainer}>
            <ThemedText
              style={[
                styles.symbolText,
                {
                  color:
                    preferredCurrency === symbol
                      ? "#11181C"
                      : Colors[theme ?? "light"].text,
                },
              ]}
            >
              {icon} {symbol} {name}
            </ThemedText>
          </View>

          {preferredCurrency !== symbol && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleDelete}
                mode={preferredCurrency === symbol ? "flat" : null}
              >
                <Trash size={28} color={"#0a7ea4"} />
              </Button>
            </View>
          )}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  currencyContainer: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  currencyWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  symbolText: {
    fontSize: 18,
    fontWeight: "600",
  },
  dataContainer: {
    flexGrow: 1,
  },
  buttonContainer: {
    width: 40,
    height: 40,
  },
});

export default CurrencyItem;
