import "server-only";

import Stripe from "stripe";
import { getStripeApiEnvironment } from "@/shared/env/stripe";

let stripeClient: Stripe | undefined;

export function getStripeClient() {
  if (!stripeClient) {
    const { secretKey } = getStripeApiEnvironment();
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}
