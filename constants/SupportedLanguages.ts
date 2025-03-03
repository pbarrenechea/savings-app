export type SupportedLang = "en" | "es";

export interface SupportedLanguage {
  label: string;
  flag: string;
  name: SupportedLang;
}

const Languages: Array<SupportedLanguage> = [
  {
    label: "English",
    flag: "🇬🇧",
    name: "en",
  },
  {
    label: "Español",
    flag: "🇪🇸",
    name: "es",
  },
];

export default Languages;
