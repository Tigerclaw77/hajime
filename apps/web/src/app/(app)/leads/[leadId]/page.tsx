import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatus } from "@/domains/leads/components/lead-status";
import { LeadStatusControl } from "@/domains/leads/components/lead-status-control";
import { getLead } from "@/domains/leads/data/leads.repository";
import { presentLead } from "@/domains/leads/presenters/lead.presenter";
import { PaymentPanel } from "@/domains/payments/components/payment-panel";
import { listLeadPayments } from "@/domains/payments/data/payments.repository";
import { formatDate, formatDateTime } from "@/shared/format/date";
import { formatUsdMinor } from "@/shared/format/money";

type LeadPageProps = { params: Promise<{ leadId: string }> };

export async function generateMetadata({ params }: LeadPageProps): Promise<Metadata> {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  return { title: lead?.name ?? "Lead" };
}

export default async function LeadPage({ params }: LeadPageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();
  const payments = await listLeadPayments(leadId);
  const presented = presentLead(lead);
  const isArchived = lead.status === "archived";

  return (
    <div className="page-shell page-shell-narrow">
      <Link className="back-link" href="/leads">Leads</Link>
      <header className="lead-header">
        <div>
          <div className="flex items-center gap-3"><div className="eyebrow">{lead.country}</div><LeadStatus status={lead.status} /></div>
          <h1>{lead.name}</h1>
          <a href={`mailto:${lead.email}`}>{lead.email}</a>
        </div>
        {!isArchived ? <Link className="button button-secondary" href={`/leads/${lead.id}/edit`}>Edit lead</Link> : null}
      </header>

      {isArchived ? <div className="archive-notice">This lead is archived and read-only.</div> : null}

      <section className="lead-overview">
        <div><span>Business type</span><strong>{lead.business_type}</strong></div>
        <div><span>Source</span><strong>{presented.source}</strong></div>
        <div><span>Coordinator</span><strong>{lead.coordinator_name ?? "Unassigned"}</strong></div>
        <div><span>Updated</span><strong>{formatDateTime(lead.updated_at)}</strong></div>
      </section>

      {!isArchived ? <LeadStatusControl lead={lead} /> : null}

      {lead.project_id ? (
        <section className="conversion-banner">
          <div><span>Converted customer</span><strong>A project was created permanently from this lead.</strong></div>
          <Link className="button button-primary" href={`/projects/${lead.project_id}`}>Open project</Link>
        </section>
      ) : null}

      <div className="lead-work-grid">
        <section className="lead-work-section">
          <div className="section-heading"><div><div className="section-eyebrow">Discovery</div><h2>{lead.discovery_meeting_date ? formatDate(lead.discovery_meeting_date) : "Not scheduled"}</h2></div>{!isArchived ? <Link className="text-link" href={`/leads/${lead.id}/discovery`}>Edit discovery</Link> : null}</div>
          <dl className="compact-details">
            <div><dt>Summary</dt><dd>{lead.discovery_summary || "No summary recorded."}</dd></div>
            <div><dt>Key concerns</dt><dd>{lead.discovery_key_concerns || "No concerns recorded."}</dd></div>
            <div><dt>Desired timeline</dt><dd>{lead.discovery_desired_timeline || "Not discussed"}</dd></div>
            <div><dt>Budget estimate</dt><dd>{formatUsdMinor(lead.discovery_budget_estimate_minor)}</dd></div>
            <div><dt>Next action</dt><dd>{lead.discovery_next_action || "Not defined"}</dd></div>
          </dl>
        </section>

        <section className="lead-work-section">
          <div className="section-heading"><div><div className="section-eyebrow">Proposal</div><h2>{presented.package}</h2></div>{!isArchived && !lead.project_id ? <Link className="text-link" href={`/leads/${lead.id}/proposal`}>Edit proposal</Link> : null}</div>
          <dl className="compact-details">
            <div><dt>Sent date</dt><dd>{formatDate(lead.proposal_sent_date)}</dd></div>
            <div><dt>Expected value</dt><dd>{formatUsdMinor(lead.proposal_expected_value_minor)}</dd></div>
            <div><dt>Expiration</dt><dd>{formatDate(lead.proposal_expiration_date)}</dd></div>
            <div><dt>Outcome</dt><dd>{presented.proposalOutcome}</dd></div>
          </dl>
        </section>
      </div>

      <PaymentPanel lead={lead} payments={payments} />

      <section className="notes-section">
        <div className="section-header"><h2>Notes</h2></div>
        <p>{lead.notes || "No notes yet."}</p>
      </section>

      <section className="metadata-section">
        <div className="section-header"><h2>Record</h2></div>
        <dl className="metadata-list"><div><dt>Created</dt><dd>{formatDateTime(lead.created_at)}</dd></div><div><dt>Updated</dt><dd>{formatDateTime(lead.updated_at)}</dd></div></dl>
      </section>
    </div>
  );
}
