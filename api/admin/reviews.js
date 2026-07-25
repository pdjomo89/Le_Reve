import { neon } from "@neondatabase/serverless";
import { timingSafeEqual } from "node:crypto";

/**
 * Moderation endpoint. Everything here is gated on REVIEWS_ADMIN_PASSWORD,
 * sent as `x-admin-password`. If that variable is unset the endpoint refuses
 * outright rather than falling open.
 */

function authorized(req) {
  const expected = process.env.REVIEWS_ADMIN_PASSWORD;
  if (!expected) return false;

  const supplied = String(req.headers["x-admin-password"] ?? "");
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (!authorized(req)) {
    return res.status(401).json({ error: "Not authorized." });
  }

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === "GET") {
    const status = ["pending", "approved", "rejected"].includes(req.query?.status)
      ? req.query.status
      : "pending";
    try {
      const reviews = await sql`
        SELECT id, name, email, rating, headline, body, event_detail, status, created_at
        FROM reviews
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT 200
      `;
      const counts = await sql`
        SELECT status, count(*)::int AS count FROM reviews GROUP BY status
      `;
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({
        reviews,
        counts: Object.fromEntries(counts.map((c) => [c.status, c.count])),
      });
    } catch (err) {
      console.error("admin GET failed", err);
      return res.status(500).json({ error: "Could not load reviews." });
    }
  }

  if (req.method === "PATCH") {
    const payload = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
    const id = Number(payload.id);
    const action = payload.action;

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Missing review id." });
    }
    if (!["approve", "reject", "pend"].includes(action)) {
      return res.status(400).json({ error: "Unknown action." });
    }

    const status = { approve: "approved", reject: "rejected", pend: "pending" }[action];

    try {
      const [row] = await sql`
        UPDATE reviews
        SET status = ${status},
            approved_at = ${status === "approved" ? new Date().toISOString() : null}
        WHERE id = ${id}
        RETURNING id, status
      `;
      if (!row) return res.status(404).json({ error: "No such review." });
      return res.status(200).json(row);
    } catch (err) {
      console.error("admin PATCH failed", err);
      return res.status(500).json({ error: "Could not update review." });
    }
  }

  res.setHeader("Allow", "GET, PATCH");
  return res.status(405).json({ error: "Method not allowed" });
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
