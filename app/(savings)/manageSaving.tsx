import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { SavingDataProps } from "@/types";
import useSavings from "@/hooks/useSavings";
import SavingForm from "@/components/savings/SavingForm";

const ManageSavingScreen = () => {
  const params = useLocalSearchParams();
  const isEditing = !!params.id;
  const { addSaving, updateSaving, savings } = useSavings();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const confirmHandler = async (savingData: SavingDataProps) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateSaving(savingData);
      } else {
        await addSaving(savingData);
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save date - please try again later");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? t("savings.editSaving") : t("savings.newSaving"),
    });
  }, []);
  return (
    <>
      <SavingForm
        defaultValue={
          (isEditing && savings.find((item) => params.id === item.id)) || {}
        }
        onCancel={() => navigation.goBack()}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? t("buttons.edit") : t("buttons.add")}
      />
    </>
  );
};
export default ManageSavingScreen;
