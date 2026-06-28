import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations.js";

const LanguageContext = createContext(null);

const DEFAULT_LANGUAGE = "id";
const STORAGE_KEY = "daffa-project-index-language";

function getNestedValue(source, path) {
  return path.split(".").reduce((currentValue, key) => {
    if (!currentValue || typeof currentValue !== "object") {
      return undefined;
    }

    return currentValue[key];
  }, source);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (savedLanguage === "id" || savedLanguage === "en") {
      return savedLanguage;
    }

    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "id" ? "id" : "en";
  }, [language]);

  const value = useMemo(() => {
    const toggleLanguage = () => {
      setLanguage((currentLanguage) =>
        currentLanguage === "id" ? "en" : "id"
      );
    };

    const t = (path, fallback = "") => {
      const selectedText = getNestedValue(translations[language], path);
      const fallbackText = getNestedValue(translations[DEFAULT_LANGUAGE], path);

      return selectedText ?? fallbackText ?? fallback;
    };

    return {
      language,
      setLanguage,
      toggleLanguage,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}