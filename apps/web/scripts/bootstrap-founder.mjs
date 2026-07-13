import pg from "pg";
import { betterAuth } from "better-auth";

const { Pool } = pg;

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

const databaseUrl = requireEnvironment("DATABASE_URL");
const secret = requireEnvironment("BETTER_AUTH_SECRET");
const siteUrl = requireEnvironment("NEXT_PUBLIC_SITE_URL");
const email = requireEnvironment("HAJIME_FOUNDER_EMAIL").toLowerCase();
const password = requireEnvironment("HAJIME_FOUNDER_PASSWORD");
const name = process.env.HAJIME_FOUNDER_NAME?.trim() || "Hajime Founder";

if (password.length < 12) {
  throw new Error("HAJIME_FOUNDER_PASSWORD must contain at least 12 characters.");
}

const pool = new Pool({ connectionString: databaseUrl });

try {
  const existing = await pool.query(
    'select id from "user" where lower(email) = lower($1) limit 1',
    [email],
  );

  if (existing.rows[0]) {
    process.stdout.write(`Founder account already exists. User ID: ${existing.rows[0].id}\n`);
    process.exitCode = 2;
  } else {
    const auth = betterAuth({
      advanced: {
        cookiePrefix: "hajime",
        database: { generateId: "uuid" },
      },
      baseURL: siteUrl,
      database: pool,
      emailAndPassword: { enabled: true },
      secret,
      trustedOrigins: [siteUrl],
    });

    await auth.api.signUpEmail({ body: { email, name, password } });

    const created = await pool.query(
      'select id from "user" where lower(email) = lower($1) limit 1',
      [email],
    );
    const founderId = created.rows[0]?.id;
    if (!founderId) throw new Error("Founder account creation did not return a database user.");

    process.stdout.write(`Founder account created. User ID: ${founderId}\n`);
  }
} finally {
  await pool.end();
}
