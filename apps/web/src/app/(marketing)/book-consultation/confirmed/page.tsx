import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Request Received", robots: { index: false, follow: false } };

export default function ConfirmedPage() {
  return <div className="marketing-container confirmation-page"><div className="confirmation-mark" aria-hidden="true">✓</div><span className="marketing-eyebrow">Request received</span><h1>Thank you. We will review the details first.</h1><p>If Hajime is a useful fit, you will receive a personal reply with discovery-call options. No preparation is required beyond the context you already shared.</p><div><Link className="button button-primary button-large" href="/">Return home</Link><Link className="button button-secondary button-large" href="/resources">Review resources</Link></div></div>;
}
