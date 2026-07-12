import { z } from "zod";

export const TARGET_TIMELINES = [
  "Within 30 days",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Exploring",
] as const;

export const websiteLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.email("Enter a valid email address.").max(320),
  country: z.string().trim().min(2, "Enter your country.").max(100),
  currentBusiness: z.string().trim().min(2, "Tell us about your current business.").max(160),
  targetTimeline: z.enum(TARGET_TIMELINES, { error: "Choose a target timeline." }),
  currentSituation: z.string().trim().min(20, "Share a little more so we can prepare.").max(3000, "Keep this under 3,000 characters."),
  companyWebsite: z.string().max(200),
});

export type WebsiteLeadInput = z.infer<typeof websiteLeadSchema>;
