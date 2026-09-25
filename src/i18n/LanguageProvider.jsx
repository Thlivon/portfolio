import { createContext, useContext, useEffect, useMemo } from "react";
import es from "@/messages/es.json";
import en from "@/messages/en.json";
import { DEFAULT_LANGUAGE } from "@/i18n/languages";

const messagesByLang = { es, en };

const LanguageContext = createContext(null);

export const LanguageProvider = ({ lang, children }) => {
  const value = useMemo(
    () => ({ lang, messages: messagesByLang[lang] ?? messagesByLang[DEFAULT_LANGUAGE] }),
    [lang]
  );

  // Al cambiar de idioma sin recargar (ES/EN en el navbar) el <head> pre-renderizado queda
  // con el idioma anterior: actualizar lo que ve el usuario (lang y título de la pestaña).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = value.messages.meta.title;
  }, [lang, value]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslations = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslations must be used within a LanguageProvider");
  return ctx;
};
