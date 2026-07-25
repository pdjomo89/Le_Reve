import { neon } from "@neondatabase/serverless";

/** Public review endpoint: read approved reviews, submit a new one for moderation. */

const MAX_PER_IP_PER_HOUR = 3;

const LIMITS = {
  name: 80,
  email: 160,
  headline: 120,
  body: 2000,
  eventDetail: 160,
};

function db() {
  return neon(process.env.DATABASE_URL);
}

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  return (Array.isArray(fwd) ? fwd[0] : fwd || "").split(",")[0].trim() || "unknown";
}

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function validate(payload) {
  const errors = {};

  const name = clean(payload.name, LIMITS.name);
  if (!name) errors.name = "Please tell us your name.";

  const rating = Number(payload.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Choose a rating from 1 to 5.";
  }

  const body = clean(payload.body, LIMITS.body);
  if (body.length < 10) errors.body = "A few more words, please — at least 10 characters.";

  const email = clean(payload.email, LIMITS.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email doesn't look right.";
  }

  return {
    errors,
    values: {
      name,
      email: email || null,
      rating,
      body,
      headline: clean(payload.headline, LIMITS.headline) || null,
      eventDetail: clean(payload.eventDetail, LIMITS.eventDetail) || null,
    },
  };
}

export default async function handler(req, res) {
  const sql = db();

  if (req.method === "GET") {
    try {
      const reviews = await sql`
        SELECT id, name, rating, headline, body, event_detail, created_at
        FROM reviews
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT 200
      `;
      const [summary] = await sql`
        SELECT count(*)::int AS count,
               COALESCE(round(avg(rating)::numeric, 1), 0)::float AS average
        FROM reviews
        WHERE status = 'approved'
      `;
      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");
      return res.status(200).json({ reviews, ...summary });
    } catch (err) {
      console.error("reviews GET failed", err);
      return res.status(500).json({ error: "Could not load reviews." });
    }
  }

  if (req.method === "POST") {
    const payload = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
    const { errors, values } = validate(payload);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    try {
      // Cheap flood guard — a public form with no auth in front of it.
      const ip = clientIp(req);
      const [{ recent }] = await sql`
        SELECT count(*)::int AS recent
        FROM reviews
        WHERE submitter_ip = ${ip} AND created_at > now() - interval '1 hour'
      `;
      if (recent >= MAX_PER_IP_PER_HOUR) {
        return res
          .status(429)
          .json({ error: "That's a few reviews in a short while — try again later." });
      }

      await sql`
        INSERT INTO reviews (name, email, rating, headline, body, event_detail, submitter_ip)
        VALUES (${values.name}, ${values.email}, ${values.rating}, ${values.headline},
                ${values.body}, ${values.eventDetail}, ${ip})
      `;
      // Deliberately not returning the row: it is not public until approved.
      return res.status(201).json({ ok: true, pending: true });
    } catch (err) {
      console.error("reviews POST failed", err);
      return res.status(500).json({ error: "Could not save your review." });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
