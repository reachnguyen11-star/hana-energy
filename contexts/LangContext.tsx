"use client";

import { createContext, useContext } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

const LangContext = createContext<Translations>(translations.vi);

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={translations[lang]}>
      {children}
    </LangContext.Provider>
  );
}

export function useT(): Translations {
  return useContext(LangContext);
}
