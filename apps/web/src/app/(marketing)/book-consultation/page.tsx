import type { Metadata } from "next";
import { WebsiteLeadForm } from "@/domains/leads/components/website-lead-form";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Book Consultation", description: "Request a discovery call about forming and launching your business in Japan.", alternates: { canonical: "/book-consultation" } };

export default function BookConsultationPage() {
  return <div className="marketing-container marketing-page consultation-page"><PageIntro eyebrow="Book consultation" title="Tell us where you are starting.">This 30-minute discovery call is for founders actively evaluating a Japan business launch. We will clarify fit, constraints, and the most useful next step.</PageIntro><div className="consultation-layout"><WebsiteLeadForm /><aside className="consultation-aside"><span className="marketing-eyebrow">What happens next</span><ol><li><strong>We review your context</strong><p>Your inquiry enters our lead workspace as a new website request.</p></li><li><strong>We confirm fit</strong><p>If Hajime is likely to help, we reply with options for a discovery conversation.</p></li><li><strong>You get a clear next step</strong><p>After the call, we recommend a proposal, a manual next action, or a more suitable professional route.</p></li></ol><div><span>Bring to the call</span><p>Your target timeline, business activity, ownership plan, and the decisions currently blocking progress.</p></div></aside></div></div>;
}
