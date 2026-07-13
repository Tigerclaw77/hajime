export const PAYMENT_METHODS = ["invoice", "payment_link"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentStatus = "creating" | "open" | "paid" | "void";

export type LeadPayment = {
  amount_minor: number;
  created_at: string;
  currency_code: "USD";
  description: string;
  id: string;
  invoice_due_days: number | null;
  lead_id: string;
  method: PaymentMethod;
  owner_id: string;
  paid_at: string | null;
  payment_url: string | null;
  status: PaymentStatus;
  stripe_checkout_session_id: string | null;
  stripe_customer_id: string | null;
  stripe_invoice_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_payment_link_id: string | null;
  updated_at: string;
};

export const PAYMENT_METHOD_LABELS: Record<LeadPayment["method"], string> = {
  invoice: "Stripe invoice",
  payment_link: "Payment Link",
};

export const PAYMENT_STATUS_LABELS: Record<LeadPayment["status"], string> = {
  creating: "Setup incomplete",
  open: "Awaiting payment",
  paid: "Paid",
  void: "Void",
};
