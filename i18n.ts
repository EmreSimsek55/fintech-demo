import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// assets / translationfiles
import de from "./assets/translations/de.json";
import en from "./assets/translations/en.json";
import { getLocales } from "expo-localization";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: getLocales()[0].languageTag, // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
