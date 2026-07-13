import "server-only";

import type { WebsiteLeadInput } from "@/domains/leads/schemas/website-lead.schema";
import { queryDatabase } from "@/shared/database/pool";
import { getWebsiteLeadEnvironment } from "@/shared/env/database";

export async function createWebsiteLead(input: WebsiteLeadInput) {
  const { ownerId } = getWebsiteLeadEnvironment();
  await queryDatabase(
    `insert into leads (
      owner_id, name, email, country, business_type,
      discovery_desired_timeline, notes, source, status
    ) values ($1, $2, $3, $4, $5, $6, $7, 'website', 'new')`,
    [
      ownerId,
      input.name,
      input.email,
      input.country,
      input.currentBusiness,
      input.targetTimeline,
      input.currentSituation,
    ],
  );
}
