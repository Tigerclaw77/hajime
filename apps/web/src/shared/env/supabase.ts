import { z } from "zod";

const supabaseEnvironmentSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

const websiteLeadEnvironmentSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  HAJIME_WEBSITE_LEAD_OWNER_ID: z.uuid(),
});

export function getSupabaseEnvironment() {
  const result = supabaseEnvironmentSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });

  if (!result.success) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and add the project URL and publishable key.",
    );
  }

  return {
    url: result.data.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: result.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
}

export function getWebsiteLeadEnvironment() {
  const result = websiteLeadEnvironmentSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    HAJIME_WEBSITE_LEAD_OWNER_ID: process.env.HAJIME_WEBSITE_LEAD_OWNER_ID,
  });

  if (!result.success) {
    throw new Error(
      "Website lead ingestion is not configured. Add the service role key and lead owner ID to the server environment.",
    );
  }

  return {
    serviceRoleKey: result.data.SUPABASE_SERVICE_ROLE_KEY,
    ownerId: result.data.HAJIME_WEBSITE_LEAD_OWNER_ID,
  };
}
