import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { requireCurrentUser } from "@/domains/auth/server/current-user";

export const dynamic = "force-dynamic";

export default async function ApplicationLayout({ children }: { children: ReactNode }) {
  const user = await requireCurrentUser();
  return <AppShell email={user.email ?? "Signed in"}>{children}</AppShell>;
}
