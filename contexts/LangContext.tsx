"use client";

import { createContext, useContext, useEffect } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

const LangContext = createContext<Translations>(translations.vi);

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  /* Root layout renders a single <html lang="vi">; sync the document language
     to the active locale so /en is announced as English to screen readers,
     browser translation and JS-aware crawlers. */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={translations[lang]}>
      {children}
    </LangContext.Provider>
  );
}

export function useT(): Translations {
  return useContext(LangContext);
}
