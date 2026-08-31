import { Pool } from "pg";

// Reuse a single pool across hot reloads / serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __jobprimedPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and point it at your Postgres instance."
    );
  }
  return new Pool({
    connectionString,
    // Hosted providers like Neon/Supabase require SSL; local Postgres does not.
    ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
  });
}

// Lazy on purpose: this file's top-level code runs whenever Next.js
// statically analyzes any route that imports it — including during
// `next build`, before any real request happens. Building the Pool eagerly
// here would mean a missing DATABASE_URL breaks the BUILD itself, not just
// requests at runtime. getPool() defers that connection attempt until a
// request actually needs the database.
export function getPool(): Pool {
  if (!global.__jobprimedPool) {
    global.__jobprimedPool = createPool();
  }
  return global.__jobprimedPool;
}
