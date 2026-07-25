/**
 * Creates the reviews table. Safe to re-run.
 *
 *   node --env-file=.env.local scripts/init-db.mjs
 */
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS reviews (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT,
    rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
    headline    TEXT,
    body        TEXT        NOT NULL,
    event_detail TEXT,
    status      TEXT        NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected')),
    submitter_ip TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    approved_at TIMESTAMPTZ
  )
`;

// Keep re-runs working against a table created before submitter_ip existed.
await sql`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS submitter_ip TEXT`;

// Backs the per-IP flood guard on submission.
await sql`
  CREATE INDEX IF NOT EXISTS reviews_ip_created_idx
  ON reviews (submitter_ip, created_at DESC)
`;

// The public page only ever reads approved rows, newest first.
await sql`
  CREATE INDEX IF NOT EXISTS reviews_status_created_idx
  ON reviews (status, created_at DESC)
`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM reviews`;
console.log(`reviews table ready — ${count} row(s)`);
