import { z } from "zod";

export const UPDATE_INTERESTS = ["Formation updates", "Policy changes", "Major deadlines", "New guidance", "Future roadmap"] as const;

export const subscriberSchema = z.object({
  email: z.email("Enter a valid email address.").max(320),
  interests: z.array(z.enum(UPDATE_INTERESTS)).min(1, "Choose at least one update type."),
  companyWebsite: z.string().max(200),
});

export type SubscriberInput = z.infer<typeof subscriberSchema>;
