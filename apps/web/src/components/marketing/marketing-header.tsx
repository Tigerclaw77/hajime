import Link from "next/link";

const navigation = [
  ["How it works", "/how-it-works"],
  ["Pricing", "/pricing"],
  ["Resources", "/resources"],
  ["About", "/about"],
] as const;

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <div className="marketing-container marketing-header-inner">
        <Link className="marketing-brand" href="/" aria-label="Hajime Japan home">
          <span className="marketing-brand-mark" aria-hidden="true">H</span>
          <span>Hajime Japan</span>
        </Link>
        <nav className="marketing-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="button button-primary marketing-header-cta" href="/book-consultation">Book a call</Link>
        <details className="marketing-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/book-consultation">Book a discovery call</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
