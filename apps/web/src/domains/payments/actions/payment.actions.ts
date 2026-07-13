"use server";

import { revalidatePath } from "next/cache";
import { getLead } from "@/domains/leads/data/leads.repository";
import {
  finalizeLeadPaymentSetup,
  getLeadPayment,
  reserveLeadPayment,
} from "@/domains/payments/data/payments.repository";
import {
  createPaymentSchema,
  type CreatePaymentInput,
} from "@/domains/payments/schemas/payment.schema";
import { createHostedStripePayment } from "@/domains/payments/server/stripe-payment.service";
import { leadIdSchema } from "@/domains/leads/schemas/lead.schema";
import type { ActionResult } from "@/shared/actions/action-result";
import { validationError } from "@/shared/actions/action-result";
import { moneyInputToMinor } from "@/shared/format/money";

export async function createStripePaymentAction(
  leadId: string,
  input: CreatePaymentInput,
): Promise<ActionResult<{ paymentUrl: string }>> {
  const id = leadIdSchema.safeParse(leadId);
  const parsed = createPaymentSchema.safeParse(input);
  if (!id.success) return { ok: false, message: "Lead not found." };
  if (!parsed.success) {
    return validationError<{ paymentUrl: string }>(parsed.error.flatten().fieldErrors);
  }

  const amountMinor = moneyInputToMinor(parsed.data.amount);
  if (!amountMinor) return { ok: false, message: "Enter a payment amount." };

  try {
    const lead = await getLead(id.data);
    if (!lead) return { ok: false, message: "Lead not found." };
    if (!lead.proposal_package) {
      return { ok: false, message: "Add a proposed package before requesting payment." };
    }
    if (["lost", "archived", "paid"].includes(lead.status)) {
      return { ok: false, message: "This lead cannot accept a new payment request." };
    }

    const paymentId = await reserveLeadPayment(id.data, parsed.data, amountMinor);
    const payment = await getLeadPayment(paymentId);

    if (payment.status === "open" && payment.payment_url) {
      return { ok: true, data: { paymentUrl: payment.payment_url } };
    }

    const result = await createHostedStripePayment(payment, lead);
    await finalizeLeadPaymentSetup(payment.id, result);
    revalidatePath(`/leads/${id.data}`);
    return { ok: true, data: { paymentUrl: result.paymentUrl } };
  } catch (error) {
    const stripeError = error && typeof error === "object"
      ? error as {
          code?: unknown;
          message?: unknown;
          name?: unknown;
          requestId?: unknown;
          statusCode?: unknown;
          type?: unknown;
        }
      : {};
    console.error("Stripe payment request failed", {
      code: typeof stripeError.code === "string" ? stripeError.code : undefined,
      leadId: id.data,
      message: typeof stripeError.message === "string" ? stripeError.message : undefined,
      name: typeof stripeError.name === "string" ? stripeError.name : undefined,
      requestId: typeof stripeError.requestId === "string" ? stripeError.requestId : undefined,
      statusCode: typeof stripeError.statusCode === "number" ? stripeError.statusCode : undefined,
      type: typeof stripeError.type === "string" ? stripeError.type : undefined,
    });
    const message = error instanceof Error && error.message.includes("different active payment")
      ? "This lead already has a different active payment request."
      : "Stripe could not finish this payment request. Retry to resume the same request without creating a duplicate.";
    return { ok: false, message };
  }
}
