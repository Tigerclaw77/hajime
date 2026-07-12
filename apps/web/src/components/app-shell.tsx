import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/domains/auth/actions/auth.actions";
import { PrimaryNav } from "@/components/primary-nav";

export function AppShell({
  children,
  email,
}: {
  children: ReactNode;
  email: string;
}) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link className="app-brand" href="/projects">
          <span className="brand-mark" aria-hidden="true">
            始
          </span>
          <span>
            <strong>Hajime Japan</strong>
            <small>Launch operations</small>
          </span>
        </Link>
        <PrimaryNav />
        <div className="account-block">
          <span className="truncate">{email}</span>
          <form action={signOutAction}>
            <button>Sign out</button>
          </form>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
