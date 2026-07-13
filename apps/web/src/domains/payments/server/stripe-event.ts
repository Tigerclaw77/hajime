import type Stripe from "stripe";
import {
  stripeObjectId,
  stripePaymentMetadataKey,
  type PaidPaymentEvent,
} from "@/domains/payments/model/stripe";

function eventPaidAt(event: Stripe.Event) {
  return new Date(event.created * 1000).toISOString();
}

export function parsePaidStripeEvent(event: Stripe.Event): PaidPaymentEvent | null {
  if (event.type === "invoice.paid") {
    const invoice = event.data.object;
    const paymentId = invoice.metadata?.[stripePaymentMetadataKey];
    const customerId = stripeObjectId(invoice.customer);
    if (!paymentId || !customerId || invoice.amount_paid <= 0) return null;

    return {
      amountMinor: invoice.amount_paid,
      checkoutSessionId: null,
      currencyCode: invoice.currency,
      customerId,
      eventId: event.id,
      eventType: event.type,
      invoiceId: invoice.id,
      paidAt: eventPaidAt(event),
      paymentId,
      paymentIntentId: null,
      paymentLinkId: null,
    };
  }

  if (
    event.type === "checkout.session.completed"
    || event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const paymentId = session.metadata?.[stripePaymentMetadataKey];
    const customerId = stripeObjectId(session.customer);
    if (
      !paymentId
      || !customerId
      || session.mode !== "payment"
      || session.payment_status !== "paid"
      || !session.amount_total
      || !session.currency
    ) {
      return null;
    }

    return {
      amountMinor: session.amount_total,
      checkoutSessionId: session.id,
      currencyCode: session.currency,
      customerId,
      eventId: event.id,
      eventType: event.type,
      invoiceId: null,
      paidAt: eventPaidAt(event),
      paymentId,
      paymentIntentId: stripeObjectId(session.payment_intent),
      paymentLinkId: stripeObjectId(session.payment_link),
    };
  }

  return null;
}
