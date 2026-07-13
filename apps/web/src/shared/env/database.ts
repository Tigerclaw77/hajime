import { z } from "zod";

const databaseEnvironmentSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine(
      (value) => value.startsWith("postgres://") || value.startsWith("postgresql://"),
      "DATABASE_URL must be a PostgreSQL connection string.",
    ),
});

const authEnvironmentSchema = databaseEnvironmentSchema.extend({
  BETTER_AUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_SITE_URL: z.url(),
});

const websiteLeadEnvironmentSchema = z.object({
  HAJIME_WEBSITE_LEAD_OWNER_ID: z.uuid(),
});

export function getDatabaseEnvironment() {
  const result = databaseEnvironmentSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!result.success) {
    throw new Error("Neon database configuration is missing or invalid.");
  }

  return { databaseUrl: result.data.DATABASE_URL };
}

export function getAuthEnvironment() {
  const result = authEnvironmentSchema.safeParse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!result.success) {
    throw new Error("Authentication configuration is missing or invalid.");
  }

  return {
    databaseUrl: result.data.DATABASE_URL,
    secret: result.data.BETTER_AUTH_SECRET,
    siteUrl: result.data.NEXT_PUBLIC_SITE_URL,
  };
}

export function getWebsiteLeadEnvironment() {
  const result = websiteLeadEnvironmentSchema.safeParse({
    HAJIME_WEBSITE_LEAD_OWNER_ID: process.env.HAJIME_WEBSITE_LEAD_OWNER_ID,
  });

  if (!result.success) {
    throw new Error("Website lead ownership is not configured.");
  }

  return { ownerId: result.data.HAJIME_WEBSITE_LEAD_OWNER_ID };
}
