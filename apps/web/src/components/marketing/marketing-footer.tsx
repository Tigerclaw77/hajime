import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container footer-grid">
        <div>
          <Link className="marketing-brand" href="/">
            <span className="marketing-brand-mark" aria-hidden="true">H</span>
            <span>Hajime Japan</span>
          </Link>
          <p>Clear coordination for building a business in Japan.</p>
        </div>
        <nav aria-label="Service information">
          <strong>Explore</strong><Link href="/how-it-works">How it works</Link><Link href="/pricing">Pricing</Link><Link href="/faq">FAQ</Link><Link href="/resources">Resources</Link>
        </nav>
        <nav aria-label="Company information">
          <strong>Company</strong><Link href="/about">About</Link><Link href="/book-consultation">Book consultation</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="marketing-container footer-bottom"><span>Hajime Japan</span><span>Coordination, not regulated professional advice.</span></div>
    </footer>
  );
}
