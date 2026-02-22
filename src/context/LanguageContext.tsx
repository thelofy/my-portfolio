"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getDictionary, type Lang, type Dictionary } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  dict: Dictionary;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dict = getDictionary(lang);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "fa" : "en"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    if (lang === "fa") {
      root.classList.add("font-fa");
      root.classList.remove("font-en");
    } else {
      root.classList.add("font-en");
      root.classList.remove("font-fa");
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, dict, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
