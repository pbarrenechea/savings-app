export interface CurrencyDataProps {
  id?: string;
  icon?: string;
  symbol?: string;
  referenceValue?: number;
  name?: string;
}

export interface SavingDataProps {
  id?: string;
  name?: string;
  value?: number;
  currency?: string;
}

export type ColorScheme = "light" | "dark";
