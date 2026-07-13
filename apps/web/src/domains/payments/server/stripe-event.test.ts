import type Stripe from "stripe";
import { describe, expect, it } from "vitest";
import { parsePaidStripeEvent } from "@/domains/payments/server/stripe-event";

function stripeEvent(value: unknown) {
  return value as Stripe.Event;
}

describe("parsePaidStripeEvent", () => {
  it("maps a paid invoice to the local payment request", () => {
    const parsed = parsePaidStripeEvent(stripeEvent({
      created: 1_800_000_000,
      data: {
        object: {
          amount_paid: 950000,
          currency: "usd",
          customer: "cus_invoice",
          id: "in_hajime",
          metadata: { hajime_payment_id: "2ec6826b-951d-4470-836b-8d64f0632ec4" },
        },
      },
      id: "evt_invoice_paid",
      type: "invoice.paid",
    }));

    expect(parsed).toMatchObject({
      amountMinor: 950000,
      currencyCode: "usd",
      customerId: "cus_invoice",
      eventId: "evt_invoice_paid",
      invoiceId: "in_hajime",
      paymentId: "2ec6826b-951d-4470-836b-8d64f0632ec4",
    });
  });

  it("maps a paid Payment Link checkout and provider references", () => {
    const parsed = parsePaidStripeEvent(stripeEvent({
      created: 1_800_000_000,
      data: {
        object: {
          amount_total: 480000,
          currency: "usd",
          customer: "cus_checkout",
          id: "cs_hajime",
          metadata: { hajime_payment_id: "2ec6826b-951d-4470-836b-8d64f0632ec4" },
          mode: "payment",
          payment_intent: "pi_hajime",
          payment_link: "plink_hajime",
          payment_status: "paid",
        },
      },
      id: "evt_checkout_paid",
      type: "checkout.session.completed",
    }));

    expect(parsed).toMatchObject({
      amountMinor: 480000,
      checkoutSessionId: "cs_hajime",
      paymentIntentId: "pi_hajime",
      paymentLinkId: "plink_hajime",
    });
  });

  it("ignores incomplete, unpaid, and unrelated Stripe events", () => {
    expect(parsePaidStripeEvent(stripeEvent({
      created: 1_800_000_000,
      data: { object: { id: "cs_unpaid", payment_status: "unpaid" } },
      id: "evt_unpaid",
      type: "checkout.session.completed",
    }))).toBeNull();
    expect(parsePaidStripeEvent(stripeEvent({
      created: 1_800_000_000,
      data: { object: {} },
      id: "evt_customer",
      type: "customer.created",
    }))).toBeNull();
  });
});
