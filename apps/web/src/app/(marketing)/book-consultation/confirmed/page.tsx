import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Request Received", robots: { index: false, follow: false } };

export default function ConfirmedPage() {
  return <div className="marketing-container confirmation-page"><div className="confirmation-mark" aria-hidden="true">✓</div><span className="marketing-eyebrow">Launch received</span><h1>Your roadmap now has a human next step.</h1><p>The founder will review your context and respond within one business day. The reply will include discovery times, one focused question, or a clear alternative when Hajime is not the right route.</p><div><Link className="button button-primary button-large" href="/launch-roadmap">Review my roadmap</Link><Link className="button button-secondary button-large" href="/pricing">Compare launch packages</Link></div></div>;
}
