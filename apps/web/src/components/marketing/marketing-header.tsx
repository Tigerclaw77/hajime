import Link from "next/link";

const navigation = [
  ["How it works", "/how-it-works"],
  ["Updates", "/updates"],
  ["Founder", "/about"],
  ["Pricing", "/pricing"],
] as const;

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <div className="marketing-container marketing-header-inner">
        <Link className="marketing-brand" href="/" aria-label="Hajime Japan home">
          <span className="marketing-brand-mark" aria-hidden="true">H</span>
          <span className="marketing-brand-lockup"><strong>HAJIME</strong><small>Launch Japan</small></span>
        </Link>
        <nav className="marketing-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="button button-primary marketing-header-cta" href="/launch-roadmap">Start my roadmap</Link>
        <details className="marketing-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/launch-roadmap">Start my roadmap</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
