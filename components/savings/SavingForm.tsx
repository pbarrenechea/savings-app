import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { ColorScheme, SavingDataProps } from "@/types";
import { useTranslation } from "react-i18next";
import CurrencySelect from "@/components/currencySelect";
import useCurrencies from "@/hooks/useCurrencies";
import useSettings from "@/hooks/useSettings";

interface CurrencyFormProps {
  onCancel: () => void;
  onSubmit: (data: SavingDataProps) => void;
  submitButtonLabel: string;
  defaultValue: SavingDataProps;
}

const SavingForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}: CurrencyFormProps) => {
  const { t } = useTranslation("app");
  const { currencies } = useCurrencies();
  const { preferredTheme } = useSettings();
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValue?.name ? defaultValue.name : "",
      isValid: true,
    },
    currency: {
      value: defaultValue?.currency ? defaultValue.currency : "",
      isValid: true,
    },
    value: {
      value: defaultValue?.value ? Number(defaultValue.value).toString() : "",
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
      value: +inputs.value.value,
      name: inputs.name.value,
      currency: inputs.currency.value || currencies[0].symbol,
      id: defaultValue?.id,
    };

    const valueIsValid = !isNaN(currencyData.value) && currencyData.value > 0;
    const nameIsValid = currencyData.name?.trim().length > 0;
    const currencyIsValid = currencyData.currency?.trim().length > 0;
    if (!nameIsValid || !currencyIsValid || !valueIsValid) {
      setInputs((currInputs) => ({
        name: { value: currInputs.name.value, isValid: nameIsValid },
        currency: {
          value: currInputs.currency.value,
          isValid: currencyIsValid,
        },
        value: {
          value: currInputs.value.value,
          isValid: valueIsValid,
        },
      }));
      return;
    }
    onSubmit(currencyData);
  }

  return (
    <ThemedView style={styles.formContainer}>
      <View style={styles.currencySelectContainer}>
        <Text>{t("savings.currency")}</Text>
        <CurrencySelect
          onSelect={(selectedItem, index) => {
            inputChangeValue("currency", selectedItem.symbol);
          }}
          selectedCurrency={inputs.currency.value || currencies[0]}
          preferredTheme={preferredTheme as ColorScheme}
          currencies={currencies}
        />
      </View>

      <Input
        label={t("savings.name")}
        invalid={!inputs.name.isValid}
        textInputConfig={{
          value: inputs.name.value,
          keyboardType: "default",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("name", enteredValue),
        }}
      />
      <Input
        label={t("savings.value")}
        invalid={!inputs.value.isValid}
        textInputConfig={{
          value: inputs.value.value,
          keyboardType: "decimal-pad",
          onChangeText: (enteredValue: string | number) =>
            inputChangeValue("value", enteredValue),
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
  currencySelectContainer: {
    marginHorizontal: "auto",
    marginVertical: 8,
    width: "80%",
  },
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

export default SavingForm;
