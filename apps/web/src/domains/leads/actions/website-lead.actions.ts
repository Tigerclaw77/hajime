"use server";

import { createWebsiteLead } from "@/domains/leads/data/website-leads.repository";
import { websiteLeadSchema, type WebsiteLeadInput } from "@/domains/leads/schemas/website-lead.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";

function isUniqueViolation(error: unknown) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "23505");
}

export async function submitWebsiteLeadAction(input: WebsiteLeadInput): Promise<ActionResult> {
  const parsed = websiteLeadSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

  if (parsed.data.companyWebsite) return { ok: true, data: undefined };

  try {
    await createWebsiteLead(parsed.data);
    return { ok: true, data: undefined };
  } catch (error) {
    // Existing inquiries receive the same confirmation to avoid exposing lead records.
    if (isUniqueViolation(error)) return { ok: true, data: undefined };
    return { ok: false, message: "We could not send your request. Please try again." };
  }
}
