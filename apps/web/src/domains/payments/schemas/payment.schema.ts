import { z } from "zod";
import { PAYMENT_METHODS } from "@/domains/payments/model/payment";

export const createPaymentSchema = z.object({
  amount: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid USD amount with up to 2 decimal places.")
    .refine((value) => Number(value) > 0, "Enter an amount greater than zero."),
  description: z.string().trim().min(3, "Enter a payment description.").max(500),
  dueDays: z
    .string()
    .regex(/^\d+$/, "Enter whole days between 1 and 90.")
    .refine((value) => Number(value) >= 1 && Number(value) <= 90, "Enter 1 to 90 days."),
  method: z.enum(PAYMENT_METHODS),
});

export const paymentIdSchema = z.uuid();

export type CreatePaymentInput = z.input<typeof createPaymentSchema>;
export type ParsedCreatePaymentInput = z.output<typeof createPaymentSchema>;
