import { z } from "zod";
import {
  PROJECT_HEALTH_VALUES,
  PROJECT_PACKAGES,
  PROJECT_STAGES,
} from "@/domains/projects/model/project";

export const projectFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter a project name.")
    .max(120, "Keep the name under 120 characters."),
  countryCode: z.literal("JP"),
  package: z.enum(PROJECT_PACKAGES),
  currentStage: z.enum(PROJECT_STAGES),
  health: z.enum(PROJECT_HEALTH_VALUES),
  estimatedCompletion: z
    .union([z.literal(""), z.iso.date("Enter a valid date.")]),
  coordinatorName: z
    .string()
    .trim()
    .max(120, "Keep the coordinator name under 120 characters.")
    .refine(
      (value) => value.length === 0 || value.length >= 2,
      "Enter at least 2 characters or leave this blank.",
    ),
});

export const projectIdSchema = z.uuid();
export type ProjectFormInput = z.infer<typeof projectFormSchema>;
