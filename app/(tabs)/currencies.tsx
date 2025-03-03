import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import CurrencyItem from "@/components/currencies/CurrencyItem";
import AddButton from "@/components/ui/AddButton";
import { useRouter } from "expo-router";
import Loader from "@/components/ui/Loader";
import useCurrencies from "@/hooks/useCurrencies";

export default function CurrenciesScreen() {
  const { currencies, loadingCurrencies, deleteCurrency } = useCurrencies();
  const deletionHandler = (id: string) => {
    deleteCurrency(id);
  };
  const router = useRouter();
  return (
    <ThemedView style={styles.stepContainer}>
      {loadingCurrencies ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={currencies}
            renderItem={({ item }) => (
              <CurrencyItem
                id={item.id}
                icon={item.icon}
                name={item.name}
                referenceValue={item.referenceValue}
                symbol={item.symbol}
                deletionHandler={deletionHandler}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <AddButton
            handler={() => router.push("/(currencies)/manageCurrency")}
          />
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
});
