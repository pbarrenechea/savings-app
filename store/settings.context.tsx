import { createContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Settings } from "@/entities";
import { useColorScheme } from "react-native";
import i18n, { FALLBACK_LANGUAGE } from "@/i18n";

export const SettingsContext = createContext({
  isLoadingSettings: true,
  preferredLanguage: "en",
  preferredCurrency: "€",
  preferredTheme: "light",
  setPreferredCurrency: (id: string) => {},
  setPreferredLanguage: (lang: string) => {},
  setPreferredTheme: (theme: string) => {},
});

function SettingsContextProvider({ children }: { children: React.ReactNode }) {
  const database = useDatabase();
  const [settingsId, setSettingsId] = useState<string>("");
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);
  const [preferredLanguage, setPreferredLanguage] = useState<string>("en");
  const [preferredCurrency, setPreferredCurrency] = useState<string>("€");
  const colorScheme = useColorScheme();

  const setPreferredTheme = (theme: string) => {
    Appearance.setColorScheme(theme as ColorSchemeName);
  };
  useEffect(() => {
    async function initializeSettings() {
      let currentSettings = await Settings.getSettings(database);
      try {
        if (!currentSettings) {
          currentSettings = await Settings.createDefault(database);
        }
        setSettingsId(currentSettings.id);
        setPreferredTheme(currentSettings.preferredTheme);
        setPreferredLanguage(currentSettings.preferredLanguage);
        await i18n.changeLanguage(currentSettings.preferredLanguage);
        setPreferredCurrency(currentSettings.preferredCurrency);
        setIsLoadingSettings(false);
      } catch (e) {
        console.error(e);
      }
    }
    initializeSettings();
  }, []);

  const updateLanguage = async (language: string) => {
    await Settings.updateLanguage(database, settingsId, language);
    await i18n.changeLanguage(language);
    setPreferredLanguage(language);
  };

  const updateTheme = async (theme: string) => {
    await Settings.updateTheme(database, settingsId, theme);
    setPreferredTheme(theme);
  };

  const updateCurrency = async (currency: string) => {
    await Settings.updateCurrency(database, settingsId, currency);
    setPreferredCurrency(currency);
  };

  const value = {
    preferredLanguage,
    preferredCurrency,
    preferredTheme: colorScheme,
    setPreferredLanguage: updateLanguage,
    setPreferredCurrency: updateCurrency,
    setPreferredTheme: updateTheme,
    isLoadingSettings,
  };
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
