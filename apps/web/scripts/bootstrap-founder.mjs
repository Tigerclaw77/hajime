import pg from "pg";
import { betterAuth } from "better-auth";

const { Pool } = pg;

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function promptHidden(label) {
  if (!process.stdin.isTTY || !process.stdout.isTTY || !process.stdin.setRawMode) {
    throw new Error("An interactive terminal is required to enter the founder password.");
  }

  return new Promise((resolve, reject) => {
    const input = process.stdin;
    const output = process.stdout;
    const wasRaw = input.isRaw;
    let value = "";

    function finish() {
      input.off("data", onData);
      input.setRawMode(Boolean(wasRaw));
      input.pause();
      output.write("\n");
    }

    function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          finish();
          reject(new Error("Founder bootstrap cancelled."));
          return;
        }

        if (character === "\r" || character === "\n") {
          finish();
          resolve(value);
          return;
        }

        if (character === "\b" || character === "\u007f") {
          value = value.slice(0, -1);
        } else if (character >= " ") {
          value += character;
        }
      }
    }

    output.write(label);
    input.setEncoding("utf8");
    input.setRawMode(true);
    input.resume();
    input.on("data", onData);
  });
}

const databaseUrl = requireEnvironment("DATABASE_URL");
const secret = requireEnvironment("BETTER_AUTH_SECRET");
const siteUrl = requireEnvironment("NEXT_PUBLIC_SITE_URL");
const email = requireEnvironment("HAJIME_FOUNDER_EMAIL").toLowerCase();
const name = process.env.HAJIME_FOUNDER_NAME?.trim() || "Hajime Founder";

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
    const password = await promptHidden("Founder password (12+ characters): ");
    if (password.length < 12) {
      throw new Error("Founder password must contain at least 12 characters.");
    }

    const confirmation = await promptHidden("Confirm founder password: ");
    if (password !== confirmation) {
      throw new Error("Founder passwords do not match.");
    }

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
