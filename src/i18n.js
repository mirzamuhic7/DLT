// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files for French and Arabic
import frTranslation from "./locales/fr.json"; // French translation
import arTranslation from "./locales/ar.json"; // Arabic translation

i18n
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources: {
      fr: {
        translation: frTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: "fr", // Default language (French)
    fallbackLng: "fr", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // Disable suspense for SSR (optional)
    },
  });

export default i18n;
