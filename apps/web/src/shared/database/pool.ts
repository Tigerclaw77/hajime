import "server-only";

import { Pool, type PoolClient, type QueryResultRow } from "pg";
import { getDatabaseEnvironment } from "@/shared/env/database";

type DatabaseGlobal = typeof globalThis & { hajimeDatabasePool?: Pool };

const databaseGlobal = globalThis as DatabaseGlobal;

export function getDatabasePool() {
  if (!databaseGlobal.hajimeDatabasePool) {
    const { databaseUrl } = getDatabaseEnvironment();
    databaseGlobal.hajimeDatabasePool = new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      max: 5,
    });
  }

  return databaseGlobal.hajimeDatabasePool;
}

export async function queryDatabase<Row extends QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  const result = await getDatabasePool().query<Row>(text, values);
  return result.rows;
}

export async function withDatabaseTransaction<T>(
  work: (client: PoolClient) => Promise<T>,
) {
  const client = await getDatabasePool().connect();
  try {
    await client.query("begin");
    const result = await work(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
