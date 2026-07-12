import type { Metadata } from "next";
import Link from "next/link";
import { LeadCard } from "@/domains/leads/components/lead-card";
import { listLeads } from "@/domains/leads/data/leads.repository";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage() {
  const { active, archived } = await listLeads();
  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <div className="eyebrow">Founder-led sales</div>
          <h1>Leads</h1>
          <p>Keep the next paying customer clear, personal, and moving.</p>
        </div>
        <Link className="button button-primary" href="/leads/new">New lead</Link>
      </header>

      {active.length ? (
        <section aria-labelledby="active-leads">
          <div className="section-header"><h2 id="active-leads">Active</h2><span>{active.length}</span></div>
          <div className="lead-list">{active.map((lead) => <LeadCard key={lead.id} lead={lead} />)}</div>
        </section>
      ) : (
        <section className="empty-state">
          <span className="brand-mark" aria-hidden="true">始</span>
          <h2>Your first customer starts here.</h2>
          <p>Capture enough context for a thoughtful conversation. Campaigns and automation can wait.</p>
          <Link className="button button-primary" href="/leads/new">Create your first lead</Link>
        </section>
      )}

      {archived.length ? (
        <section className="mt-14" aria-labelledby="archived-leads">
          <div className="section-header"><h2 id="archived-leads">Archived</h2><span>{archived.length}</span></div>
          <div className="lead-list lead-list-archived">{archived.map((lead) => <LeadCard key={lead.id} lead={lead} />)}</div>
        </section>
      ) : null}
    </div>
  );
}
