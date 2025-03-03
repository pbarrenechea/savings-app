import { createContext, useEffect, useReducer, useState } from "react";
import { CurrencyDataProps } from "@/types";
import { Currency } from "@/entities";
import { useDatabase } from "@nozbe/watermelondb/hooks";

interface MultipleCurrenciesPayload {
  data: Array<CurrencyDataProps>;
}

interface SingleCurrencyPayload {
  data: CurrencyDataProps;
}

interface StoreAction {
  type: string;
  payload: MultipleCurrenciesPayload | SingleCurrencyPayload;
}

export const CurrenciesContext = createContext({
  currencies: [],
  setCurrencies: (currencies: Array<CurrencyDataProps>) => {},
  addCurrency: (c: CurrencyDataProps) => {},
  deleteCurrency: (id: string) => {},
  updateCurrency: (c: CurrencyDataProps) => {},
  loadingCurrencies: true,
});

function currenciesReducer(
  state: Array<CurrencyDataProps>,
  action: StoreAction,
) {
  switch (action.type) {
    case "SET":
      return (action.payload as MultipleCurrenciesPayload).data;
    case "ADD":
      return [{ ...(action.payload as SingleCurrencyPayload).data }, ...state];
    case "UPDATE":
      const updateCurrencyIndex = state.findIndex(
        (e) => e.id === (action.payload as SingleCurrencyPayload).data.id,
      );
      const updateCurrencyItem = state[updateCurrencyIndex];
      const newItem = { ...updateCurrencyItem, ...action.payload.data };
      const updatedCurrencies = [...state];
      updatedCurrencies[updateCurrencyIndex] = newItem;
      return updatedCurrencies;
    case "DELETE":
      return state.filter(
        (e) => e.id !== (action.payload as SingleCurrencyPayload).data.id,
      );
    default:
      return state;
  }
}

function CurrenciesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const database = useDatabase();
  const [currenciesState, dispatch] = useReducer(currenciesReducer, []);
  const [loadingCurrencies, setLoadingCurrencies] = useState<boolean>(true);

  async function addCurrency(currencyData: CurrencyDataProps) {
    const newCurrency = await Currency.create(database, currencyData);
    dispatch({
      type: "ADD",
      payload: { data: { ...currencyData, id: newCurrency.id } },
    });
  }

  async function deleteCurrency(id: string) {
    await Currency.deleteById(database, id);
    dispatch({ type: "DELETE", payload: { data: { id } } });
  }

  async function updateCurrency(currencyData: CurrencyDataProps) {
    await Currency.update(database, currencyData);
    dispatch({ type: "UPDATE", payload: { data: currencyData } });
  }

  function setCurrencies(currencies: CurrencyDataProps[]) {
    dispatch({ type: "SET", payload: { data: currencies } });
  }

  useEffect(() => {
    Currency.getAll(database).then((currencies) => {
      setCurrencies(
        currencies.map(
          ({ id, name, symbol, icon, referenceValue }: Currency) => ({
            id,
            name,
            symbol,
            icon,
            referenceValue,
          }),
        ),
      );
      setLoadingCurrencies(false);
    });
  }, []);

  const value = {
    currencies: currenciesState,
    setCurrencies,
    addCurrency,
    deleteCurrency,
    updateCurrency,
    loadingCurrencies,
  };
  return (
    <CurrenciesContext.Provider value={value}>
      {children}
    </CurrenciesContext.Provider>
  );
}

export default CurrenciesContextProvider;
