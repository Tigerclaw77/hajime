import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container footer-grid">
        <div>
          <Link className="marketing-brand" href="/">
            <span className="marketing-brand-mark" aria-hidden="true">H</span>
            <span className="marketing-brand-lockup"><strong>HAJIME</strong><small>Launch Japan</small></span>
          </Link>
          <p>Build a company in Japan. One clear launch path.</p>
        </div>
        <nav aria-label="Service information">
          <strong>Explore</strong><Link href="/launch-roadmap">Launch roadmap</Link><Link href="/updates">Formation updates</Link><Link href="/knowledge-base">Knowledge base</Link><Link href="/resources">Resource hub</Link><Link href="/pricing">Pricing</Link>
        </nav>
        <nav aria-label="Company information">
          <strong>Company</strong><Link href="/about">Founder and purpose</Link><Link href="/professionals">Professional standards</Link><Link href="/email-updates">Email updates</Link><Link href="/faq">FAQ</Link><Link href="/book-consultation">Request discovery</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="marketing-container footer-bottom"><span>Hajime Japan</span><span>Coordination, not regulated professional advice.</span></div>
    </footer>
  );
}
