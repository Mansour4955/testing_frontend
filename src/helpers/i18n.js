"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "@/data/languages/index"

// Initialize i18n
i18n
  .use(LanguageDetector) // Automatically detect the user's language
  .use(initReactI18next) // Integrate with React
  .init({
    resources, // Translation resources
    fallbackLng: "en", // Default language if detection fails
    supportedLngs: ["en", "es", "fr"], // Supported languages
    detection: {
      // Detection order for user language
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"], // Cache detected language
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
