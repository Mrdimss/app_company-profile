import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export { slugify } from "@/lib/slugify";

export const defaultCompanySettings = {
  id: "company",
  companyName: "GIRIK",
  tagline: "Trade & Distribution Company",
  logoUrl: null as string | null,
  logoAltText: "Company logo",
  email: "hello@company.com",
  phone: "+62 812 3456 7890",
  address: "Jakarta, Indonesia",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const fallbackProjects = [
  {
    id: "fallback-project-1",
    title: "Digital Transformation Strategy",
    slug: "digital-transformation-strategy",
    description: "We helped modernize operations with a better digital workflow and customer experience.",
    image: null,
    category: "Strategy",
    projectUrl: null,
    isPublished: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "fallback-project-2",
    title: "Brand Identity Refresh",
    slug: "brand-identity-refresh",
    description: "A full brand repositioning effort across digital and print touchpoints for a growing audience.",
    image: null,
    category: "Branding",
    projectUrl: null,
    isPublished: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fallbackServices = [
  {
    id: "fallback-service-1",
    title: "Business Consulting",
    slug: "business-consulting",
    description: "Strategic guidance to improve operations, sharpen positioning, and accelerate growth.",
    icon: "◎",
    sortOrder: 1,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "fallback-service-2",
    title: "Website Development",
    slug: "website-development",
    description: "Modern websites and product pages designed to convert interest into action.",
    icon: "◈",
    sortOrder: 2,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fallbackProducts = [
  {
    id: "fallback-product-1",
    name: "Core Business Solution",
    slug: "core-business-solution",
    description: "An integrated platform for organizing operations, teams, and customer-facing workflows.",
    image: null,
    category: "Solutions",
    productUrl: null,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const hasDatabaseUrl = () => {
  const url = (process.env.DATABASE_URL ?? "").trim();

  return (
    url.startsWith("mysql://") ||
    url.startsWith("postgres://") ||
    url.startsWith("postgresql://") ||
    url.startsWith("prisma://") ||
    url.startsWith("prisma+postgres://")
  );
};

async function safeRead<T>(action: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabaseUrl()) {
    return fallback;
  }

  try {
    return await action();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Database fallback activated:", error);
    }
    return fallback;
  }
}

export async function getCompanySettings() {
  const company = await safeRead(
    async () =>
      prisma.companySetting.findUnique({
        where: { id: "company" },
      }),
    null,
  );

  return {
    ...defaultCompanySettings,
    ...(company ?? {}),
  };
}

export async function getPublishedProjects() {
  return safeRead(
    async () =>
      prisma.project.findMany({
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    fallbackProjects,
  );
}

export async function getPublishedServices() {
  return safeRead(
    async () =>
      prisma.service.findMany({
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
    fallbackServices,
  );
}

export async function getPublishedProducts() {
  return safeRead(
    async () =>
      prisma.product.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
      }),
    fallbackProducts,
  );
}

export async function getUniqueSlug(
  value: string,
  findExisting: (slug: string) => Promise<{ id: string } | null>,
  currentId?: string,
): Promise<string> {
  const baseSlug = slugify(value);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await findExisting(slug);

    if (!existing || existing.id === currentId) {
      return slug;
    }

    const suffixText = `-${suffix++}`;
    const slugBase = baseSlug.slice(0, 100 - suffixText.length).replace(/-+$/g, "");
    slug = `${slugBase}${suffixText}`;
  }
}
