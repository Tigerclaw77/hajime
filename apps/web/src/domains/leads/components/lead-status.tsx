import { LEAD_STATUS_LABELS, type Lead } from "@/domains/leads/model/lead";

export function LeadStatus({ status }: { status: Lead["status"] }) {
  return <span className={`lead-status lead-status-${status}`}>{LEAD_STATUS_LABELS[status]}</span>;
}
