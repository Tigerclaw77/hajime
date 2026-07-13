import { z } from "zod";
import { LEAD_SOURCES, MANUAL_LEAD_STATUSES, PROPOSAL_OUTCOMES } from "@/domains/leads/model/lead";
import { PROJECT_PACKAGES } from "@/domains/projects/model/project";

const optionalMoney = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\d+(\.\d{1,2})?$/.test(value),
    "Enter a valid USD amount with up to 2 decimal places.",
  );

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Enter the lead name.").max(120),
  email: z.email("Enter a valid email address.").max(320),
  country: z.string().trim().min(2, "Enter a country.").max(100),
  businessType: z.string().trim().min(2, "Enter a business type.").max(160),
  source: z.enum(LEAD_SOURCES),
  notes: z.string().trim().max(5000, "Keep notes under 5,000 characters."),
  coordinatorName: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value.length === 0 || value.length >= 2, "Enter at least 2 characters or leave this blank."),
});

export const discoveryFormSchema = z.object({
  meetingDate: z.union([z.literal(""), z.iso.date("Enter a valid meeting date.")]),
  summary: z.string().trim().max(5000),
  keyConcerns: z.string().trim().max(5000),
  desiredTimeline: z.string().trim().max(500),
  budgetEstimate: optionalMoney,
  nextAction: z.string().trim().max(1000),
});

export const proposalFormSchema = z
  .object({
    sentDate: z.union([z.literal(""), z.iso.date("Enter a valid sent date.")]),
    packageProposed: z.union([z.literal(""), z.enum(PROJECT_PACKAGES)]),
    expectedValue: optionalMoney,
    expirationDate: z.union([z.literal(""), z.iso.date("Enter a valid expiration date.")]),
    outcome: z.enum(PROPOSAL_OUTCOMES),
  })
  .refine(
    (value) => !value.sentDate || !value.expirationDate || value.expirationDate >= value.sentDate,
    { message: "Expiration must be on or after the sent date.", path: ["expirationDate"] },
  );

export const leadStatusSchema = z.enum(MANUAL_LEAD_STATUSES);
export const leadIdSchema = z.uuid();

export type LeadFormInput = z.infer<typeof leadFormSchema>;
export type DiscoveryFormInput = z.infer<typeof discoveryFormSchema>;
export type ProposalFormInput = z.infer<typeof proposalFormSchema>;
