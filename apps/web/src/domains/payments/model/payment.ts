import type { Database } from "@/shared/supabase/database.types";

export type LeadPayment = Database["public"]["Tables"]["lead_payments"]["Row"];

export const PAYMENT_METHODS = ["invoice", "payment_link"] as const;

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
