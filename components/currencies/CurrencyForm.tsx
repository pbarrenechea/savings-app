import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import type { CurrencyDataProps } from "@/types";
import { useTranslation } from "react-i18next";

interface CurrencyFormProps {
  onCancel: () => void;
  onSubmit: (data: CurrencyDataProps) => void;
  submitButtonLabel: string;
  defaultValue: CurrencyDataProps;
}

const CurrencyForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}: CurrencyFormProps) => {
  const { t } = useTranslation("app");
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValue?.name ? defaultValue.name : "",
      isValid: true,
    },
    icon: {
      value: defaultValue?.icon ? defaultValue.icon : "",
      isValid: true,
    },
    symbol: {
      value: defaultValue?.symbol ? defaultValue.symbol : "",
      isValid: true,
    },
    referenceValue: {
      value: defaultValue?.referenceValue
        ? Number(defaultValue.referenceValue).toString()
        : "",
      isValid: true,
    },
  });
  function inputChangeValue(
    inputIdentifier: string,
    enteredValue: string | number,
  ) {
    setInputs((currInputs) => ({
      ...currInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const currencyData = {
      referenceValue: +inputs.referenceValue.value,
      name: inputs.name.value,
      icon: inputs.icon.value,
      symbol: inputs.symbol.value,
      id: defaultValue?.id,
    };

    const referenceValueIsValid =
      !isNaN(currencyData.referenceValue) && currencyData.referenceValue > 0;
    const nameIsValid = currencyData.name?.trim().length > 0;
    const iconIsValid = currencyData.icon?.trim().length > 0;
    const symbolIsValid = currencyData.symbol?.trim().length > 0;
    if (
      !nameIsValid ||
      !iconIsValid ||
      !symbolIsValid ||
      !referenceValueIsValid
    ) {
      setInputs((currInputs) => ({
        name: { value: currInputs.name.value, isValid: nameIsValid },
        icon: { value: currInputs.icon.value, isValid: iconIsValid },
        symbol: { value: currInputs.symbol.value, isValid: symbolIsValid },
        referenceValue: {
          value: currInputs.referenceValue.value,
          isValid: referenceValueIsValid,
        },
      }));
      return;
    }
    onSubmit(currencyData);
  }

  return (
    <ThemedView style={styles.formContainer}>
      <Input
        label={t("currencies.icon")}
        invalid={!inputs.icon.isValid}
        textInputConfig={{
          value: inputs.icon.value,
          keyboardType: "default",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("icon", enteredValue),
        }}
      />

      <Input
        label={t("currencies.symbol")}
        invalid={!inputs.symbol.isValid}
        textInputConfig={{
          value: inputs.symbol.value,
          keyboardType: "default",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("symbol", enteredValue),
        }}
      />

      <Input
        label={t("currencies.name")}
        invalid={!inputs.name.isValid}
        textInputConfig={{
          value: inputs.name.value,
          keyboardType: "default",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("name", enteredValue),
        }}
      />
      <Input
        label={t("currencies.referenceValue")}
        invalid={!inputs.referenceValue.isValid}
        textInputConfig={{
          value: inputs.referenceValue.value,
          keyboardType: "decimal-pad",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("referenceValue", enteredValue),
        }}
      />
      <ThemedView style={styles.buttons}>
        <Button onPress={onCancel} mode={"flat"} style={styles.button}>
          {t("buttons.cancel")}
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  formContainer: {
    marginTop: 18,
    marginBottom: 18,
    height: "100%",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 24,
  },
});

export default CurrencyForm;
