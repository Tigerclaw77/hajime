import { z } from "zod";

const stripeApiEnvironmentSchema = z.object({
  STRIPE_SECRET_KEY: z
    .string()
    .min(1)
    .refine((value) => !value.startsWith("sk_org_"), "Use Hajime's account-level key."),
});

const stripeWebhookEnvironmentSchema = z.object({
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
});

export function getStripeApiEnvironment() {
  const result = stripeApiEnvironmentSchema.safeParse({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  });

  if (!result.success) {
    throw new Error(
      "Stripe is not configured. Add Hajime's account-level Stripe secret key.",
    );
  }

  return {
    secretKey: result.data.STRIPE_SECRET_KEY,
  };
}

export function getStripeWebhookEnvironment() {
  const result = stripeWebhookEnvironmentSchema.safeParse({
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (!result.success) {
    throw new Error("Stripe webhooks are not configured. Add the endpoint signing secret.");
  }

  return { webhookSecret: result.data.STRIPE_WEBHOOK_SECRET };
}
