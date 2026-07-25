/**
 * Inserts sample approved reviews so the /reviews page has content to show.
 *
 * These are PLACEHOLDER reviews written to match the site's existing sample
 * testimonials — they are not from real clients. Replace them with genuine
 * submissions before the site is public.
 *
 *   node --env-file=.env.local scripts/seed-reviews.mjs          # insert
 *   node --env-file=.env.local scripts/seed-reviews.mjs --undo   # remove
 */
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Marks every row this script owns, so --undo can remove exactly these.
const SEED_TAG = "seed:sample";

const SAMPLES = [
  {
    name: "Amara & Josh",
    rating: 5,
    headline: "Like they were down the street the whole time",
    body: "We planned a 220-person wedding in Sedona from three time zones away. Le Rêve handled the venue, the vendors and every logistical knot without once making it our problem. The weekend itself was the first time in a year we felt genuinely unhurried.",
    eventDetail: "L'Auberge de Sedona · November 2025",
  },
  {
    name: "Priya & Daniel",
    rating: 5,
    headline: "A monsoon, and nobody noticed",
    body: "A storm rolled in ninety minutes before the ceremony. They moved 180 guests indoors and rebuilt the entire room while we were getting ready. Guests still tell us it was the most beautiful room they had ever seen — none of them know it wasn't the plan.",
    eventDetail: "The Phoenician, Scottsdale · August 2025",
  },
  {
    name: "Sofia & Ravi",
    rating: 5,
    headline: "Three days, two cultures, zero decisions left to us",
    body: "Four events across three days, two families with very different expectations, and not one moment where I had to stop and make a call. Camille and the team had already thought of it. That was the whole gift.",
    eventDetail: "Hacienda del Sol, Tucson · March 2026",
  },
  {
    name: "Hannah & Mei",
    rating: 4,
    headline: "Worth every conversation",
    body: "The design work was genuinely beautiful and the day ran to the minute. Our only note is that we would have liked a little more contact in the quiet middle stretch of planning — once we said so, it was fixed immediately and never came up again.",
    eventDetail: "Desert Botanical Garden, Phoenix · October 2025",
  },
];

const undo = process.argv.includes("--undo");

if (undo) {
  const removed = await sql`
    DELETE FROM reviews WHERE submitter_ip = ${SEED_TAG} RETURNING id
  `;
  console.log(`removed ${removed.length} seeded review(s)`);
} else {
  // Idempotent: clear any previous seed before re-inserting.
  await sql`DELETE FROM reviews WHERE submitter_ip = ${SEED_TAG}`;

  for (const s of SAMPLES) {
    await sql`
      INSERT INTO reviews (name, rating, headline, body, event_detail,
                           status, approved_at, submitter_ip)
      VALUES (${s.name}, ${s.rating}, ${s.headline}, ${s.body}, ${s.eventDetail},
              'approved', now(), ${SEED_TAG})
    `;
  }
  console.log(`inserted ${SAMPLES.length} sample review(s)`);
}

const [summary] = await sql`
  SELECT count(*)::int AS count,
         COALESCE(round(avg(rating)::numeric, 1), 0)::float AS average
  FROM reviews WHERE status = 'approved'
`;
console.log(`approved total: ${summary.count}, average: ${summary.average}`);
