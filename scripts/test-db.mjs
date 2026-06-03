import pg from "pg";

const { Pool } = pg;

const DATABASE_URL =
  "postgresql://neondb_owner:npg_BzuERtnT2Ko1@ep-delicate-union-ap1pnnnz-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  max: 1,
  connectionTimeoutMillis: 10000,
});

async function main() {
  console.log("Connecting to Neon PostgreSQL...");
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT version(), current_database()");
    console.log("✓ Connected successfully");
    console.log("  Database:", rows[0].current_database);
    console.log("  Version:", rows[0].version.split(" ").slice(0, 2).join(" "));

    // Test schema creation
    await client.query(`
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
    console.log("✓ Schema initialised (tables: site_state, submissions)");

    const { rows: tables } = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
    );
    console.log("  Tables:", tables.map((r) => r.tablename).join(", "));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("✗ Connection failed:", err.message);
  process.exit(1);
});
