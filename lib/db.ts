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

export const pool = global.__jobprimedPool ?? createPool();
if (process.env.NODE_ENV !== "production") {
  global.__jobprimedPool = pool;
}
