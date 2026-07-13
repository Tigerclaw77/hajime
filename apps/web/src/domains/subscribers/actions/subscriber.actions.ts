"use server";

import { createOrUpdateSubscriber } from "@/domains/subscribers/data/subscribers.repository";
import { subscriberSchema, type SubscriberInput } from "@/domains/subscribers/schemas/subscriber.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";

export async function subscribeToUpdatesAction(input: SubscriberInput): Promise<ActionResult> {
  const parsed = subscriberSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);
  if (parsed.data.companyWebsite) return { ok: true, data: undefined };

  try {
    await createOrUpdateSubscriber(parsed.data);
    return { ok: true, data: undefined };
  } catch {
    return { ok: false, message: "We could not save your preferences. Please try again." };
  }
}
