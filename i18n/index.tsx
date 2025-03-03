import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";

import es from "@/i18n/es.json";
import en from "@/i18n/en.json";

export const FALLBACK_LANGUAGE = "en";

const getDeviceLanguage = () => {
  // @ts-ignore
  const userLang = getLocales()[0].languageCode;

  return userLang ? userLang : FALLBACK_LANGUAGE;
};
const deviceLanguage = getDeviceLanguage();

export const defaultTranslationModules = [
  { locale: "en", texts: en },
  { locale: "es", texts: es },
];

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: { es, en },
    ns: ["common", "app"],
    defaultNS: "app",
    lng: FALLBACK_LANGUAGE || deviceLanguage,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
