import "server-only";

import { requireCurrentUser } from "@/domains/auth/server/current-user";
import type { LeadPayment } from "@/domains/payments/model/payment";
import type { PaidPaymentEvent } from "@/domains/payments/model/stripe";
import type { ParsedCreatePaymentInput } from "@/domains/payments/schemas/payment.schema";
import { queryDatabase } from "@/shared/database/pool";
import {
  nullableTimestampToIso,
  timestampToIso,
} from "@/shared/database/values";

type PaymentDatabaseRow = Omit<
  LeadPayment,
  "amount_minor" | "created_at" | "paid_at" | "updated_at"
> & {
  amount_minor: number | string;
  created_at: Date | string;
  paid_at: Date | string | null;
  updated_at: Date | string;
};

function normalizePayment(payment: PaymentDatabaseRow): LeadPayment {
  return {
    ...payment,
    amount_minor: Number(payment.amount_minor),
    created_at: timestampToIso(payment.created_at),
    paid_at: nullableTimestampToIso(payment.paid_at),
    updated_at: timestampToIso(payment.updated_at),
  };
}

export async function listLeadPayments(leadId: string) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<PaymentDatabaseRow>(
    `select * from lead_payments
     where lead_id = $1 and owner_id = $2
     order by created_at desc`,
    [leadId, user.id],
  );
  return rows.map(normalizePayment);
}

export async function reserveLeadPayment(
  leadId: string,
  input: ParsedCreatePaymentInput,
  amountMinor: number,
) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<{ payment_id: string }>(
    `select reserve_lead_payment($1, $2, $3, $4, $5, $6) as payment_id`,
    [
      user.id,
      leadId,
      input.method,
      amountMinor,
      input.description,
      input.method === "invoice" ? Number(input.dueDays) : null,
    ],
  );
  if (!rows[0]) throw new Error("Payment reservation did not return an id.");
  return rows[0].payment_id;
}

export async function getLeadPayment(paymentId: string) {
  const user = await requireCurrentUser();
  const rows = await queryDatabase<PaymentDatabaseRow>(
    `select * from lead_payments where id = $1 and owner_id = $2 limit 1`,
    [paymentId, user.id],
  );
  if (!rows[0]) throw new Error("Payment request not found.");
  return normalizePayment(rows[0]);
}

export async function saveLeadStripeCustomer(leadId: string, customerId: string) {
  const user = await requireCurrentUser();
  await queryDatabase(
    `update leads set stripe_customer_id = $1
     where id = $2 and owner_id = $3 and stripe_customer_id is null`,
    [customerId, leadId, user.id],
  );
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
  const user = await requireCurrentUser();
  await queryDatabase(
    `select finalize_lead_payment_setup($1, $2, $3, $4, $5, $6)`,
    [
      user.id,
      paymentId,
      result.customerId,
      result.invoiceId,
      result.paymentLinkId,
      result.paymentUrl,
    ],
  );
}

export async function recordPaidPaymentEvent(event: PaidPaymentEvent) {
  const rows = await queryDatabase<{ project_id: string }>(
    `select record_stripe_payment_paid(
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    ) as project_id`,
    [
      event.eventId,
      event.eventType,
      event.paymentId,
      event.amountMinor,
      event.currencyCode,
      event.customerId,
      event.invoiceId,
      event.paymentLinkId,
      event.checkoutSessionId,
      event.paymentIntentId,
      event.paidAt,
    ],
  );
  return rows[0]?.project_id ?? null;
}

export function findActivePayment(payments: LeadPayment[]) {
  return payments.find((payment) => payment.status === "creating" || payment.status === "open");
}
