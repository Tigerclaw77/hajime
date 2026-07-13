import "server-only";

import { requireCurrentUser } from "@/domains/auth/server/current-user";
import type { LeadPayment } from "@/domains/payments/model/payment";
import type { PaidPaymentEvent } from "@/domains/payments/model/stripe";
import type { ParsedCreatePaymentInput } from "@/domains/payments/schemas/payment.schema";
import { createSupabaseAdminClient } from "@/shared/supabase/admin";
import { createSupabaseServerClient } from "@/shared/supabase/server";

export async function listLeadPayments(leadId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("lead_payments")
    .select("*")
    .eq("lead_id", leadId)
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function reserveLeadPayment(
  leadId: string,
  input: ParsedCreatePaymentInput,
  amountMinor: number,
) {
  await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("reserve_lead_payment", {
    payment_amount_minor: amountMinor,
    payment_description: input.description,
    payment_invoice_due_days: input.method === "invoice" ? Number(input.dueDays) : null,
    payment_method: input.method,
    target_lead_id: leadId,
  });

  if (error) throw error;
  return data;
}

export async function getLeadPayment(paymentId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("lead_payments")
    .select("*")
    .eq("id", paymentId)
    .eq("owner_id", user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function saveLeadStripeCustomer(leadId: string, customerId: string) {
  const user = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("leads")
    .update({ stripe_customer_id: customerId })
    .eq("id", leadId)
    .eq("owner_id", user.id)
    .is("stripe_customer_id", null);

  if (error) throw error;
}

export async function finalizeLeadPaymentSetup(
  paymentId: string,
  result: {
    customerId: string | null;
    invoiceId: string | null;
    paymentLinkId: string | null;
    paymentUrl: string;
  },
) {
  await requireCurrentUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("finalize_lead_payment_setup", {
    provider_customer_id: result.customerId,
    provider_invoice_id: result.invoiceId,
    provider_payment_link_id: result.paymentLinkId,
    provider_payment_url: result.paymentUrl,
    target_payment_id: paymentId,
  });

  if (error) throw error;
}

export async function recordPaidPaymentEvent(event: PaidPaymentEvent) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.rpc("record_stripe_payment_paid", {
    paid_amount_minor: event.amountMinor,
    paid_currency_code: event.currencyCode,
    provider_checkout_session_id: event.checkoutSessionId,
    provider_customer_id: event.customerId,
    provider_event_id: event.eventId,
    provider_event_type: event.eventType,
    provider_invoice_id: event.invoiceId,
    provider_paid_at: event.paidAt,
    provider_payment_intent_id: event.paymentIntentId,
    provider_payment_link_id: event.paymentLinkId,
    target_payment_id: event.paymentId,
  });

  if (error) throw error;
  return data;
}

export function findActivePayment(payments: LeadPayment[]) {
  return payments.find((payment) => payment.status === "creating" || payment.status === "open");
}
