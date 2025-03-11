import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import ru from "./locales/ru";

const DEFAULT_LANGUAGE = "ru";

if (!localStorage.getItem("i18nextLng")) {
  localStorage.setItem("i18nextLng", DEFAULT_LANGUAGE);
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.MODE === "development",
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
