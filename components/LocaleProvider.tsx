"use client";

import { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("id");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeLocale = pathname ? getLocaleFromPath(pathname) : locale;

  useEffect(() => {
    document.documentElement.lang = activeLocale === "id" ? "id-ID" : "en";
  }, [activeLocale]);

  return <LocaleContext.Provider value={activeLocale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
