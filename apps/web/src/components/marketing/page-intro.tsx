import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <header className="marketing-page-intro"><span className="marketing-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{children}</p></header>;
}
