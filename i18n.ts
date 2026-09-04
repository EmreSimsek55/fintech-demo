import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// assets / translationfiles
import de from "./assets/translations/de.json";
import en from "./assets/translations/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: "de", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
