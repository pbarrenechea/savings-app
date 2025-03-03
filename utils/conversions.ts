export const convertTo = (
  currencies,
  preferredCurrency,
  currentSymbol,
  currentValue,
) => {
  if (preferredCurrency === currentSymbol) return currentValue;
  const ground = currencies.find((item) => item.referenceValue === 1.0);
  const convertFrom = currencies.find((item) => item.symbol === currentSymbol);
  const currentCurrencyValue = currencies.find(
    (item) => item.symbol === preferredCurrency,
  );
  const valueToGround =
    currentValue * (ground.referenceValue / convertFrom.referenceValue);
  return (valueToGround * currentCurrencyValue.referenceValue).toFixed(2);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
