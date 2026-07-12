import type { Metadata } from "next";
import Link from "next/link";
import { Journey } from "@/components/marketing/journey";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "How It Works", description: "A clear journey from the decision to form a business in Japan through launch.", alternates: { canonical: "/how-it-works" } };

export default function HowItWorksPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="How it works" title="A clear path from decision to launch.">Hajime turns a fragmented formation process into one visible sequence, with an owner and timeframe for every step.</PageIntro><Journey /><aside className="boundary-callout"><span className="marketing-eyebrow">A clear division of responsibility</span><h2>Coordination is not regulated advice.</h2><p>Hajime owns the plan, communication, and handoffs. Attorneys, judicial scriveners, administrative scriveners, accountants, tax attorneys, and other licensed professionals remain responsible for regulated advice and work.</p></aside><div className="page-cta"><h2>Start with the decision in front of you.</h2><Link className="button button-primary button-large" href="/book-consultation">Book a discovery call</Link></div></div>;
}
