import { describe, expect, it } from "vitest";
import {
  getLocaleFromPath,
  localeHref,
  localePath,
  messages,
  resolvePreferredLocale,
} from "./i18n";

describe("locale routing", () => {
  it("uses a saved locale before browser preferences", () => {
    expect(resolvePreferredLocale("en", "id-ID,id;q=0.9")).toBe("en");
    expect(resolvePreferredLocale("id", "en-US,en;q=0.9")).toBe("id");
  });

  it("detects supported browser languages and defaults to Indonesian", () => {
    expect(resolvePreferredLocale(undefined, "en-US,en;q=0.9,id;q=0.8")).toBe("en");
    expect(resolvePreferredLocale(undefined, "id-ID,id;q=0.9,en;q=0.8")).toBe("id");
    expect(resolvePreferredLocale(undefined, "en-GB")).toBe("en");
    expect(resolvePreferredLocale(undefined, "fr-FR,fr;q=0.9")).toBe("id");
  });

  it("switches the locale without changing the current route", () => {
    expect(localePath("en", "/id/projects")).toBe("/en/projects");
    expect(localePath("id", "/en/DetailProduk")).toBe("/id/DetailProduk");
    expect(getLocaleFromPath("/en/projects")).toBe("en");
    expect(localeHref("en", "/id/DetailProduk", "id=p-1&tab=details"))
      .toBe("/en/DetailProduk?id=p-1&tab=details");
  });

  it("keeps the Indonesian and English dictionary shapes aligned", () => {
    function expectMatchingKeys(indonesian: unknown, english: unknown) {
      if (
        !indonesian ||
        !english ||
        typeof indonesian !== "object" ||
        typeof english !== "object"
      ) {
        return;
      }

      expect(Object.keys(indonesian).sort()).toEqual(Object.keys(english).sort());
      for (const key of Object.keys(indonesian)) {
        expectMatchingKeys(
          (indonesian as Record<string, unknown>)[key],
          (english as Record<string, unknown>)[key],
        );
      }
    }

    expectMatchingKeys(messages.id, messages.en);
  });
});
