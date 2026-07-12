import { z } from "zod";

export const authSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(128, "Password is too long."),
});

export type AuthInput = z.infer<typeof authSchema>;
