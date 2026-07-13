import "server-only";

import type { Lead } from "@/domains/leads/model/lead";
import type { LeadPayment } from "@/domains/payments/model/payment";
import { stripePaymentMetadataKey } from "@/domains/payments/model/stripe";
import { saveLeadStripeCustomer } from "@/domains/payments/data/payments.repository";
import { getStripeClient } from "@/shared/stripe/client";

function requestOptions(paymentId: string, operation: string) {
  return { idempotencyKey: `hajime-${paymentId}-${operation}` };
}

async function ensureStripeCustomer(lead: Lead) {
  if (lead.stripe_customer_id) return lead.stripe_customer_id;

  const stripe = getStripeClient();
  const customer = await stripe.customers.create(
    {
      email: lead.email,
      metadata: { hajime_lead_id: lead.id, hajime_owner_id: lead.owner_id },
      name: lead.name,
    },
    { idempotencyKey: `hajime-lead-${lead.id}-customer` },
  );
  await saveLeadStripeCustomer(lead.id, customer.id);
  return customer.id;
}

async function createInvoice(payment: LeadPayment, customerId: string) {
  const stripe = getStripeClient();
  const metadata = { [stripePaymentMetadataKey]: payment.id, hajime_lead_id: payment.lead_id };
  const invoice = await stripe.invoices.create(
    {
      auto_advance: false,
      collection_method: "send_invoice",
      customer: customerId,
      days_until_due: payment.invoice_due_days ?? 14,
      description: payment.description,
      metadata,
    },
    requestOptions(payment.id, "invoice"),
  );

  await stripe.invoiceItems.create(
    {
      amount: payment.amount_minor,
      currency: "usd",
      customer: customerId,
      description: payment.description,
      invoice: invoice.id,
      metadata,
    },
    requestOptions(payment.id, "invoice-item"),
  );

  const finalized = invoice.status === "draft"
    ? await stripe.invoices.finalizeInvoice(
        invoice.id,
        {},
        requestOptions(payment.id, "finalize-invoice"),
      )
    : invoice;

  const sent = finalized.status === "open"
    ? await stripe.invoices.sendInvoice(
        finalized.id,
        {},
        requestOptions(payment.id, "send-invoice"),
      )
    : finalized;

  if (!sent.hosted_invoice_url) {
    throw new Error("Stripe did not return a hosted invoice URL.");
  }

  return {
    customerId,
    invoiceId: sent.id,
    paymentLinkId: null,
    paymentUrl: sent.hosted_invoice_url,
  };
}

async function createPaymentLink(payment: LeadPayment) {
  const stripe = getStripeClient();
  const metadata = { [stripePaymentMetadataKey]: payment.id, hajime_lead_id: payment.lead_id };
  const paymentLink = await stripe.paymentLinks.create(
    {
      after_completion: {
        hosted_confirmation: {
          custom_message: "Payment received. Hajime will confirm your launch start by email.",
        },
        type: "hosted_confirmation",
      },
      customer_creation: "always",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: payment.description },
            unit_amount: payment.amount_minor,
          },
          quantity: 1,
        },
      ],
      metadata,
      payment_intent_data: { description: payment.description, metadata },
      restrictions: { completed_sessions: { limit: 1 } },
      submit_type: "pay",
    },
    requestOptions(payment.id, "payment-link"),
  );

  return {
    customerId: null,
    invoiceId: null,
    paymentLinkId: paymentLink.id,
    paymentUrl: paymentLink.url,
  };
}

export async function createHostedStripePayment(payment: LeadPayment, lead: Lead) {
  if (payment.method === "payment_link") return createPaymentLink(payment);
  const customerId = await ensureStripeCustomer(lead);
  return createInvoice(payment, customerId);
}
