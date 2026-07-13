import "server-only";

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getDatabasePool } from "@/shared/database/pool";
import { getAuthEnvironment } from "@/shared/env/database";

function createAuth() {
  const { secret, siteUrl } = getAuthEnvironment();

  return betterAuth({
    advanced: {
      cookiePrefix: "hajime",
      database: { generateId: "uuid" },
    },
    baseURL: siteUrl,
    database: getDatabasePool(),
    emailAndPassword: { enabled: true },
    plugins: [nextCookies()],
    secret,
    trustedOrigins: [siteUrl],
  });
}

type AuthInstance = ReturnType<typeof createAuth>;
type AuthGlobal = typeof globalThis & { hajimeAuth?: AuthInstance };

const authGlobal = globalThis as AuthGlobal;

export function getAuth() {
  if (!authGlobal.hajimeAuth) authGlobal.hajimeAuth = createAuth();
  return authGlobal.hajimeAuth;
}
