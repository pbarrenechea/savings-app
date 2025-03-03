import { useContext } from "react";
import { SettingsContext } from "@/store/settings.context";

export default function useSettings() {
  return useContext(SettingsContext);
}
