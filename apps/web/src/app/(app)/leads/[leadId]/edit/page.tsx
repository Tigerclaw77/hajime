import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LeadForm } from "@/domains/leads/components/lead-form";
import { getLead } from "@/domains/leads/data/leads.repository";

type EditLeadPageProps = { params: Promise<{ leadId: string }> };
export const metadata: Metadata = { title: "Edit lead" };

export default async function EditLeadPage({ params }: EditLeadPageProps) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();
  if (lead.status === "archived") redirect(`/leads/${lead.id}`);
  return <div className="page-shell page-shell-narrow"><Link className="back-link" href={`/leads/${lead.id}`}>{lead.name}</Link><header className="page-header compact"><div><div className="eyebrow">Lead settings</div><h1>Edit lead</h1><p>Keep contact and qualification context accurate.</p></div></header><LeadForm mode="edit" lead={lead} /></div>;
}
