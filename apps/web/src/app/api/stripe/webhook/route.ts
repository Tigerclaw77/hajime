import { NextResponse } from "next/server";
import {
  recordPaidPaymentEvent,
} from "@/domains/payments/data/payments.repository";
import { parsePaidStripeEvent } from "@/domains/payments/server/stripe-event";
import { getStripeWebhookEnvironment } from "@/shared/env/stripe";
import { getStripeClient } from "@/shared/stripe/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();
  let event;

  try {
    const { webhookSecret } = getStripeWebhookEnvironment();
    event = getStripeClient().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  try {
    const paidEvent = parsePaidStripeEvent(event);

    if (paidEvent) {
      await recordPaidPaymentEvent(paidEvent);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook error";
    console.error("Stripe webhook processing failed:", message);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
