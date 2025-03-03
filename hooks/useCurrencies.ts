import { useContext } from "react";
import { CurrenciesContext } from "@/store/currencies.context";

function useCurrencies() {
  return useContext(CurrenciesContext);
}

export default useCurrencies;
