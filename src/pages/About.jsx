import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import CTABand from "../components/CTABand.jsx";
import { BRAND, STATS, TEAM, VALUES } from "../data/site.js";

/** Teaser row linking through to the full gallery. */
const STRIP = ["arch-autumn", "place-setting-terracotta", "bouquet-peach", "couple-airstream"];

export default function About() {
  return (
    <>
      <PageHeader
        photo="long-table-dusk"
        eyebrow="About the studio"
        title="Five years of"
        accent="Arizona weddings"
        lede="Le Rêve began in a one-room Scottsdale studio in 2021 with a single rule we still hold to: never take more weddings than we can personally stand behind."
      />

      <section className="section">
        <div className="container about__story">
          <Reveal className="about__story-art">
            <Photo slug="bride-bouquet-stone" size="lg" className="about__portrait" />
            <div className="about__caption">
              <span className="script">Five years in the desert</span>
              <span>Scottsdale · Sedona · Tucson</span>
            </div>
          </Reveal>

          <Reveal className="about__story-copy" delay={120}>
            <span className="eyebrow">Our story</span>
            <h2>
              It started with one <em className="script">very bad</em> wedding
            </h2>
            <p>
              In 2020 Camille watched a couple's outdoor Scottsdale ceremony collapse in a
              108° June afternoon — no shade, no water, no plan. The vendors were excellent.
              The planning simply had not accounted for where it was happening.
            </p>
            <p>
              Le Rêve was built as the answer to that. Every wedding we produce starts from the
              conditions on the ground: the sun angle at your ceremony hour, the load-in path,
              the monsoon probability for your week, the drive time from the hotel block. The
              beauty is the easy part. The engineering underneath it is the work.
            </p>
            <p>
              Today we're a team of four planners and a production crew, with studios in
              Scottsdale and — as of August 2026 — Tucson. We take twenty-two weddings a year
              and we've never handed one off.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="stats stats--bordered">
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="stats__item" delay={i * 90}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">What we hold to</span>
            <h2>
              Three things that <em className="script">don't move</em>
            </h2>
          </Reveal>

          <div className="values">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="values__item" delay={i * 110}>
                <span className="values__rule" aria-hidden="true" />
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">The team</span>
            <h2>
              Four people you'll <em className="script">actually meet</em>
            </h2>
            <p className="lede">
              No account managers, no handoffs. The planner in your first consultation is the
              planner standing at the back of your ceremony.
            </p>
          </Reveal>

          <div className="team">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <article className="card team__card">
                  <Photo slug={m.photo} zoom className="team__media" />
                  <div className="team__body">
                    <h3>{m.name}</h3>
                    <span className="team__role">{m.role}</span>
                    <p>{m.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Recent work</span>
              <h2>
                A little of what we <em className="script">build</em>
              </h2>
            </div>
            <Link to="/gallery" className="link-underline">
              See the full gallery
            </Link>
          </Reveal>
          <div className="photo-strip">
            {STRIP.map((slug, i) => (
              <Reveal key={slug} delay={i * 80}>
                <Link to="/gallery" aria-label="Open the gallery">
                  <Photo slug={slug} zoom className="photo-strip__item" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container container--narrow text-center">
          <Reveal>
            <span className="eyebrow">Visit us</span>
            <h2>
              The <em className="script">studio</em>
            </h2>
            <p className="lede">
              Consultations happen over a table with samples on it — linens, china, paper stock
              and the actual candlelight. Come see it.
            </p>
            <div className="about__contact">
              <div>
                <span className="about__contact-label">Scottsdale studio</span>
                <span>{BRAND.studio}</span>
              </div>
              <div>
                <span className="about__contact-label">Hours</span>
                <span>{BRAND.hours}</span>
              </div>
              <div>
                <span className="about__contact-label">Direct</span>
                <a href={BRAND.phoneHref}>{BRAND.phone}</a>
              </div>
              <div>
                <span className="about__contact-label">Email</span>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        eyebrow="Come by"
        title="Sit down"
        accent="with us"
        body="An hour, a table full of samples, and honest answers about what your day will cost. No obligation, no pitch deck."
      />
    </>
  );
}
