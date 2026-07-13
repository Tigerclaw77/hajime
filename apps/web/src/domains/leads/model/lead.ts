import type { Database } from "@/shared/supabase/database.types";

export type Lead = Database["public"]["Tables"]["leads"]["Row"];

export const LEAD_SOURCES = [
  "referral",
  "website",
  "founder_network",
  "partner",
  "event",
  "outbound",
  "other",
] as const;

export const LEAD_SOURCE_LABELS: Record<Lead["source"], string> = {
  referral: "Referral",
  website: "Website",
  founder_network: "Founder network",
  partner: "Partner",
  event: "Event",
  outbound: "Outbound",
  other: "Other",
};

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "discovery_scheduled",
  "proposal_sent",
  "won",
  "paid",
  "lost",
  "archived",
] as const;

export const MANUAL_LEAD_STATUSES = LEAD_STATUSES.filter(
  (status) => status !== "paid",
);

export const LEAD_STATUS_LABELS: Record<Lead["status"], string> = {
  new: "New",
  contacted: "Contacted",
  discovery_scheduled: "Discovery scheduled",
  proposal_sent: "Proposal sent",
  won: "Won",
  paid: "Paid",
  lost: "Lost",
  archived: "Archived",
};

export const PROPOSAL_OUTCOMES = [
  "open",
  "accepted",
  "declined",
  "expired",
  "superseded",
] as const;

export const PROPOSAL_OUTCOME_LABELS: Record<Lead["proposal_outcome"], string> = {
  open: "Open",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
  superseded: "Superseded",
};
