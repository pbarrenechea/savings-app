import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import CurrencyItem from "@/components/currencies/CurrencyItem";
import AddButton from "@/components/ui/AddButton";
import { useRouter } from "expo-router";
import Loader from "@/components/ui/Loader";
import useSavings from "@/hooks/useSavings";
import SavingItem from "@/components/savings/SavingItem";
import { ThemedText } from "@/components/ThemedText";
import useCurrencies from "@/hooks/useCurrencies";
import useSettings from "@/hooks/useSettings";
import { convertTo, formatNumber } from "@/utils/conversions";
import { Colors } from "@/constants/Colors";

export default function SavingsScreen() {
  const { savings, loadingSavings, deleteSaving } = useSavings();
  const { preferredCurrency, preferredTheme } = useSettings();
  const { currencies } = useCurrencies();
  const currentCurrency = currencies.find(
    (item) => item.symbol === preferredCurrency,
  );
  const deletionHandler = (id: string) => {
    deleteSaving(id);
  };
  const router = useRouter();

  const total = savings.reduce((acc, cur) => {
    const convertedSaving = convertTo(
      currencies,
      preferredCurrency,
      cur.currency,
      cur.value,
    );
    return acc + Number(convertedSaving);
  }, 0);
  return (
    <ThemedView style={styles.stepContainer}>
      {loadingSavings ? (
        <Loader />
      ) : (
        <>
          <ThemedView style={styles.totalSummary}>
            <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
              Total:
            </ThemedText>
            <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
              {currentCurrency.icon}
              {currentCurrency.symbol} {formatNumber(total)}
            </ThemedText>
          </ThemedView>
          <ThemedView
            style={[
              styles.separator,
              {
                borderColor: Colors[preferredTheme].primaryColor,
                shadowColor: Colors[preferredTheme].primaryColor,
              },
            ]}
          ></ThemedView>
          <FlatList
            data={savings}
            renderItem={({ item }) => (
              <SavingItem
                id={item.id}
                name={item.name}
                value={item.value}
                currency={item.currency}
                deletionHandler={deletionHandler}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          <AddButton handler={() => router.push("/(savings)/manageSaving")} />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    height: "100%",
  },
  totalSummary: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: "auto",
    gap: 10,
    flexDirection: "row",
    textAlign: "center",
  },
  separator: {
    gap: 8,
    borderBottomWidth: 1,
    marginHorizontal: 14,
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 10,
  },
});
