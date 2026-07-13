import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to apply Neon migrations.");
}

const migrationsDirectory = join(dirname(fileURLToPath(import.meta.url)), "..", "db", "migrations");
const migrationNames = (await readdir(migrationsDirectory))
  .filter((name) => name.endsWith(".sql"))
  .sort();

const client = new Client({ connectionString });
await client.connect();

try {
  await client.query("select pg_advisory_lock(hashtext($1))", ["hajime:database-migrations"]);
  await client.query(`
    create table if not exists schema_migrations (
      name text primary key,
      checksum text not null,
      applied_at timestamptz not null default timezone('utc', now())
    )
  `);

  for (const name of migrationNames) {
    const sql = await readFile(join(migrationsDirectory, name), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await client.query(
      "select checksum from schema_migrations where name = $1",
      [name],
    );

    if (existing.rows[0]) {
      if (existing.rows[0].checksum !== checksum) {
        throw new Error(`Applied migration ${name} has changed.`);
      }
      continue;
    }

    await client.query("begin");
    try {
      await client.query(sql);
      await client.query(
        "insert into schema_migrations (name, checksum) values ($1, $2)",
        [name, checksum],
      );
      await client.query("commit");
      process.stdout.write(`Applied ${name}\n`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  }
} finally {
  await client.query("select pg_advisory_unlock(hashtext($1))", ["hajime:database-migrations"]);
  await client.end();
}
