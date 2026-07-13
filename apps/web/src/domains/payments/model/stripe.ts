export const stripePaymentMetadataKey = "hajime_payment_id";

export function stripeObjectId(value: string | { id: string } | null) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export type PaidPaymentEvent = {
  amountMinor: number;
  checkoutSessionId: string | null;
  currencyCode: string;
  customerId: string;
  eventId: string;
  eventType: string;
  invoiceId: string | null;
  paidAt: string;
  paymentId: string;
  paymentIntentId: string | null;
  paymentLinkId: string | null;
};
