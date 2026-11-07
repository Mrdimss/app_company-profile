export type Marketplace = "shopee" | "tokopedia";

const marketplaceDomains: Record<Marketplace, string[]> = {
  shopee: [
    "shopee.co.id",
    "shopee.com",
    "shopee.com.my",
    "shopee.sg",
    "shopee.ph",
    "shopee.vn",
    "shopee.co.th",
    "shopee.tw",
    "shopee.com.br",
    "shopee.cl",
    "shopee.com.mx",
    "shopee.com.co",
    "shopee.pl",
    "shope.ee",
    "shp.ee",
  ],
  tokopedia: ["tokopedia.com"],
};

export class InvalidMarketplaceUrlError extends Error {
  constructor(marketplace: Marketplace) {
    super(
      marketplace === "shopee"
        ? "URL Shopee harus berupa tautan HTTPS Shopee yang valid."
        : "URL Tokopedia harus berupa tautan HTTPS Tokopedia yang valid.",
    );
    this.name = "InvalidMarketplaceUrlError";
  }
}

export function normalizeMarketplaceUrl(
  value: unknown,
  marketplace: Marketplace,
): string | null | undefined {
  if (typeof value === "undefined") return undefined;
  if (value === null) return null;

  if (typeof value !== "string") {
    throw new InvalidMarketplaceUrlError(marketplace);
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new InvalidMarketplaceUrlError(marketplace);
  }

  const hostname = url.hostname.toLowerCase();
  const hasMarketplaceDomain = marketplaceDomains[marketplace].some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    !hasMarketplaceDomain
  ) {
    throw new InvalidMarketplaceUrlError(marketplace);
  }

  return trimmed;
}
