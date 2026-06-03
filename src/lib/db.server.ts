import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  // Strip the sslmode / channel_binding query params from the URL so pg's
  // connection-string parser doesn't emit a deprecation warning about SSL
  // modes. We enforce SSL explicitly via the pool's ssl option instead.
  const url = new URL(connectionString);
  url.searchParams.delete("sslmode");
  url.searchParams.delete("channel_binding");
  const cleanUrl = url.toString();

  pool = new Pool({
    connectionString: cleanUrl,
    // Neon requires TLS — rejectUnauthorized:true verifies the server certificate
    ssl: { rejectUnauthorized: true },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
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
