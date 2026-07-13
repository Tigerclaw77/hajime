import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/page-intro";
import { RoadmapBuilder } from "@/components/marketing/roadmap-builder";
import { TrustStrip } from "@/components/marketing/trust-strip";

export const metadata: Metadata = { title: "Personalized Japan Launch Roadmap", description: "Estimate the sequence, professionals, documents, agencies, and potential blockers for establishing a business in Japan.", alternates: { canonical: "/launch-roadmap" } };

export default function LaunchRoadmapPage() {
  return <div className="marketing-container marketing-page launch-roadmap-page"><PageIntro eyebrow="Personalized launch roadmap" title="See the shape of your Japan launch.">Answer five operational questions. Your route, timeframe, professional map, documents, agencies, and first blockers appear as the launch takes shape.</PageIntro><TrustStrip compact /><RoadmapBuilder /></div>;
}
