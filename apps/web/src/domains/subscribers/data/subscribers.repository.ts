import "server-only";

import type { SubscriberInput } from "@/domains/subscribers/schemas/subscriber.schema";
import { createSupabaseAdminClient } from "@/shared/supabase/admin";

export async function createOrUpdateSubscriber(input: SubscriberInput) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("subscribers").upsert({
    email: input.email.toLowerCase(),
    interests: input.interests,
    status: "active",
    updated_at: new Date().toISOString(),
  }, { onConflict: "email" });

  if (error) throw error;
}
