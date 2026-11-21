import { headers } from "next/headers";
import { isLocale } from "@/lib/i18n";

export async function getRequestLocale() {
  const requestedLocale = (await headers()).get("x-girik-locale");
  return requestedLocale && isLocale(requestedLocale) ? requestedLocale : "id";
}
