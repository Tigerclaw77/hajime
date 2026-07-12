import "server-only";

import type { WebsiteLeadInput } from "@/domains/leads/schemas/website-lead.schema";
import { getWebsiteLeadEnvironment } from "@/shared/env/supabase";
import { createSupabaseAdminClient } from "@/shared/supabase/admin";

export async function createWebsiteLead(input: WebsiteLeadInput) {
  const { ownerId } = getWebsiteLeadEnvironment();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("leads").insert({
    owner_id: ownerId,
    name: input.name,
    email: input.email,
    country: input.country,
    business_type: input.currentBusiness,
    discovery_desired_timeline: input.targetTimeline,
    notes: input.currentSituation,
    source: "website",
    status: "new",
  });

  if (error) throw error;
}
