import CurrencyForm from "@/components/currencies/CurrencyForm";
import { useEffect, useState } from "react";
import type { CurrencyDataProps } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useCurrencies from "@/hooks/useCurrencies";
import { useTranslation } from "react-i18next";

const ManageCurrencyScreen = () => {
  const params = useLocalSearchParams();
  const isEditing = !!params.id;
  const { addCurrency, updateCurrency, currencies } = useCurrencies();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const confirmHandler = async (currencyData: CurrencyDataProps) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateCurrency(currencyData);
      } else {
        await addCurrency(currencyData);
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save date - please try again later");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: isEditing
        ? t("currencies.editCurrency")
        : t("currencies.newCurrency"),
    });
  }, []);
  return (
    <>
      <CurrencyForm
        defaultValue={
          (isEditing && currencies.find((item) => params.id === item.id)) || {}
        }
        onCancel={() => navigation.goBack()}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? t("buttons.edit") : t("buttons.add")}
      />
    </>
  );
};

export default ManageCurrencyScreen;
