import { useContext } from "react";
import { SavingsContext } from "@/store/savings.context";

function useSavings() {
  return useContext(SavingsContext);
}

export default useSavings;
