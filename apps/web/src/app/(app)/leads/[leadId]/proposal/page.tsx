import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProposalForm } from "@/domains/leads/components/proposal-form";
import { getLead } from "@/domains/leads/data/leads.repository";

type ProposalPageProps = { params: Promise<{ leadId: string }> };
export const metadata: Metadata = { title: "Lead proposal" };

export default async function ProposalPage({ params }: ProposalPageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();
  if (lead.status === "archived" || lead.project_id) redirect(`/leads/${lead.id}`);
  return <div className="page-shell page-shell-narrow"><Link className="back-link" href={`/leads/${lead.id}`}>{lead.name}</Link><header className="page-header compact"><div><div className="eyebrow">Proposal</div><h1>Commercial offer</h1><p>Track the package, value, validity, and current outcome.</p></div></header><ProposalForm lead={lead} /></div>;
}
