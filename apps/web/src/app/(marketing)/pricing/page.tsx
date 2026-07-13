import type { Metadata } from "next";
import { PackageGrid } from "@/components/marketing/package-grid";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Pricing", description: "Transparent package structures for business formation coordination in Japan.", alternates: { canonical: "/pricing" } };

export default function PricingPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Pricing" title="Know the boundary before you commit.">Every package states the operating limits, deliverables, response standard, customer responsibilities, and finish line. Choose the smallest package that removes the coordination burden you actually have.</PageIntro><PackageGrid /><p className="pricing-disclaimer pricing-disclaimer-large">Prices are in USD and cover only the stated Hajime scope. Government charges and professional, translation, certification, office, banking, insurance, payroll, and other external costs are separate. No payment is taken through this website. A written proposal confirms the final scope, payment schedule, external costs known at that time, cancellation treatment, and exclusions.</p></div>;
}
