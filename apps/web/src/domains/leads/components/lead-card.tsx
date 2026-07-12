import Link from "next/link";
import { LeadStatus } from "@/domains/leads/components/lead-status";
import type { Lead } from "@/domains/leads/model/lead";
import { presentLead } from "@/domains/leads/presenters/lead.presenter";
import { formatDateTime } from "@/shared/format/date";

export function LeadCard({ lead }: { lead: Lead }) {
  const presented = presentLead(lead);
  return (
    <Link className="lead-row" href={`/leads/${lead.id}`}>
      <span className="lead-primary">
        <strong>{lead.name}</strong>
        <small>{lead.email}</small>
      </span>
      <span className="lead-context">
        <small>Business</small>
        <strong>{lead.business_type}</strong>
      </span>
      <LeadStatus status={lead.status} />
      <span className="lead-context">
        <small>Source</small>
        <strong>{presented.source}</strong>
      </span>
      <span className="lead-context">
        <small>Coordinator</small>
        <strong>{lead.coordinator_name ?? "Unassigned"}</strong>
      </span>
      <span className="lead-updated">Updated {formatDateTime(lead.updated_at)}</span>
    </Link>
  );
}
