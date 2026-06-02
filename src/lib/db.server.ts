import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
  return pool;
}

let initPromise: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const p = getPool();
    await p.query(`
      CREATE TABLE IF NOT EXISTS site_state (
        id INT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        data JSONB NOT NULL,
        read BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS submissions_created_idx ON submissions(created_at DESC);
    `);
  })().catch((err) => {
    initPromise = null;
    throw err;
  });
  return initPromise;
}