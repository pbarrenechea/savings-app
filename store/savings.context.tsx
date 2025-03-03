import { createContext, useEffect, useReducer, useState } from "react";
import { SavingDataProps } from "@/types";
import { Saving } from "@/entities";
import { useDatabase } from "@nozbe/watermelondb/hooks";

interface MultipleSavingsPayload {
  data: Array<SavingDataProps>;
}

interface SingleSavingPayload {
  data: SavingDataProps;
}

interface StoreAction {
  type: string;
  payload: MultipleSavingsPayload | SingleSavingPayload;
}

export const SavingsContext = createContext({
  savings: [],
  setSavings: (savings: Array<SavingDataProps>) => {},
  addSaving: (c: SavingDataProps) => {},
  deleteSaving: (id: string) => {},
  updateSaving: (c: SavingDataProps) => {},
  loadingSavings: true,
});

function savingsReducer(state: Array<SavingDataProps>, action: StoreAction) {
  switch (action.type) {
    case "SET":
      return (action.payload as MultipleSavingsPayload).data;
    case "ADD":
      return [{ ...(action.payload as SingleSavingPayload).data }, ...state];
    case "UPDATE":
      const updateSavingIndex = state.findIndex(
        (e) => e.id === (action.payload as SingleSavingPayload).data.id,
      );
      const updateSavingItem = state[updateSavingIndex];
      const newItem = { ...updateSavingItem, ...action.payload.data };
      const updatedSavings = [...state];
      updatedSavings[updateSavingIndex] = newItem;
      return updatedSavings;
    case "DELETE":
      return state.filter(
        (e) => e.id !== (action.payload as SingleSavingPayload).data.id,
      );
    default:
      return state;
  }
}

function SavingsContextProvider({ children }: { children: React.ReactNode }) {
  const database = useDatabase();
  const [savingsState, dispatch] = useReducer(savingsReducer, []);
  const [loadingSavings, setLoadingSavings] = useState<boolean>(true);

  async function addSaving(savingData: SavingDataProps) {
    const newCurrency = await Saving.create(database, savingData);
    dispatch({
      type: "ADD",
      payload: { data: { ...savingData, id: newCurrency.id } },
    });
  }

  async function deleteSaving(id: string) {
    await Saving.deleteById(database, id);
    dispatch({ type: "DELETE", payload: { data: { id } } });
  }

  async function updateSaving(savingData: SavingDataProps) {
    await Saving.update(database, savingData);
    dispatch({ type: "UPDATE", payload: { data: savingData } });
  }

  function setSavings(savings: SavingDataProps[]) {
    dispatch({ type: "SET", payload: { data: savings } });
  }

  useEffect(() => {
    Saving.getAll(database).then((savings) => {
      setSavings(
        savings.map(({ id, name, value, currency }: Saving) => ({
          id,
          name,
          currency,
          value,
        })),
      );
      setLoadingSavings(false);
    });
  }, []);

  const value = {
    savings: savingsState,
    setSavings,
    addSaving,
    deleteSaving,
    updateSaving,
    loadingSavings,
  };
  return (
    <SavingsContext.Provider value={value}>{children}</SavingsContext.Provider>
  );
}

export default SavingsContextProvider;
