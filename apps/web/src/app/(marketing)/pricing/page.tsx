import type { Metadata } from "next";
import { PackageGrid } from "@/components/marketing/package-grid";
import { PageIntro } from "@/components/marketing/page-intro";

export const metadata: Metadata = { title: "Pricing", description: "Transparent package structures for business formation coordination in Japan.", alternates: { canonical: "/pricing" } };

export default function PricingPage() {
  return <div className="marketing-container marketing-page"><PageIntro eyebrow="Pricing" title="Clear scope before you commit.">Choose a planning blueprint, guided coordination, or a higher-touch launch. Validation prices are shown openly so the discovery call can focus on fit.</PageIntro><PackageGrid /><p className="pricing-disclaimer pricing-disclaimer-large">Prices are in USD and reflect the current validation offer. Government charges and third-party fees are not included. Your written proposal confirms scope, deliverables, exclusions, payment schedule, and known third-party costs before engagement.</p></div>;
}
