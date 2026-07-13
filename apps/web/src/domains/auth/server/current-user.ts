import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/domains/auth/server/auth";

export async function getCurrentUser() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
}
