import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/marketing/faq-list";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "FAQ", description: "Answers about Hajime's role, professional boundaries, timing, documents, costs, privacy, and payments.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  return <div className="marketing-container marketing-page marketing-page-narrow"><PageIntro eyebrow="Frequently asked questions" title="Straight answers before we begin.">Understand what Hajime coordinates, what licensed professionals own, and what to expect from an engagement.</PageIntro><FaqList /><div className="page-cta"><h2>Have a question specific to your launch?</h2><Link className="button button-primary button-large" href="/book-consultation">Book a discovery call</Link></div></div>;
}
