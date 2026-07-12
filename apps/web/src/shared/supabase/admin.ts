import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnvironment, getWebsiteLeadEnvironment } from "@/shared/env/supabase";
import type { Database } from "@/shared/supabase/database.types";

export function createSupabaseAdminClient() {
  const { url } = getSupabaseEnvironment();
  const { serviceRoleKey } = getWebsiteLeadEnvironment();

  return createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
