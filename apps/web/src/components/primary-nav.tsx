"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/projects", label: "Projects" },
  { href: "/leads", label: "Leads" },
];

export function PrimaryNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation">
      {items.map((item) => (
        <Link
          key={item.href}
          className={`nav-link ${pathname.startsWith(item.href) ? "nav-link-active" : ""}`}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
