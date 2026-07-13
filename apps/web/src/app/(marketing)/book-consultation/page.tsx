import type { Metadata } from "next";
import { WebsiteLeadForm } from "@/domains/leads/components/website-lead-form";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Request Discovery", description: "Request a review of your Japan launch and the most useful next step.", alternates: { canonical: "/book-consultation" } };

export default function BookConsultationPage() {
  return <div className="marketing-container marketing-page consultation-page"><PageIntro eyebrow="Request discovery" title="Put your launch in front of a person.">Share the business context behind your roadmap. Hajime responds within one business day with a discovery option, one focused qualification question, or an honest explanation when another route is more appropriate.</PageIntro><div className="consultation-layout"><WebsiteLeadForm /><aside className="consultation-aside"><span className="marketing-eyebrow">What happens next</span><ol><li><strong>We review the launch</strong><p>Your route, timing, business activity, and current blocker are reviewed by the founder.</p></li><li><strong>You hear from us within one business day</strong><p>If a conversation is useful, the reply includes times for a 30-minute discovery call.</p></li><li><strong>You receive one clear next step</strong><p>After discovery, Hajime sends the appropriate package scope, a manual next action, or a more suitable professional route.</p></li></ol><div><span>Useful context</span><p>Your target date, business activity, ownership plan, committed Japan trigger, and the decision currently blocking progress.</p></div></aside></div></div>;
}
