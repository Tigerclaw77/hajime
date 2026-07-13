import type { ProjectPackage } from "@/domains/projects/model/project";

export const LEAD_SOURCES = [
  "referral",
  "website",
  "founder_network",
  "partner",
  "event",
  "outbound",
  "other",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

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

export type LeadStatus = (typeof LEAD_STATUSES)[number];

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

export type ProposalOutcome = (typeof PROPOSAL_OUTCOMES)[number];

export type Lead = {
  business_type: string;
  coordinator_name: string | null;
  country: string;
  created_at: string;
  currency_code: "USD";
  discovery_budget_estimate_minor: number | null;
  discovery_desired_timeline: string;
  discovery_key_concerns: string;
  discovery_meeting_date: string | null;
  discovery_next_action: string;
  discovery_summary: string;
  email: string;
  id: string;
  name: string;
  notes: string;
  owner_id: string;
  project_id: string | null;
  proposal_expiration_date: string | null;
  proposal_expected_value_minor: number | null;
  proposal_outcome: ProposalOutcome;
  proposal_package: ProjectPackage | null;
  proposal_sent_date: string | null;
  source: LeadSource;
  status: LeadStatus;
  stripe_customer_id: string | null;
  updated_at: string;
};

export const PROPOSAL_OUTCOME_LABELS: Record<Lead["proposal_outcome"], string> = {
  open: "Open",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
  superseded: "Superseded",
};
