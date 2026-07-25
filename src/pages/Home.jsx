import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import CTABand from "../components/CTABand.jsx";
import { formatDate } from "../lib/format.js";
import heroSm from "../assets/photos/long-table-dusk-sm.webp";
import heroLg from "../assets/photos/long-table-dusk-lg.webp";
import {
  NEWS,
  PROCESS,
  REGIONS,
  SERVICES,
  STATS,
  TESTIMONIALS,
} from "../data/site.js";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__art">
        <img
          className="hero__photo"
          src={heroLg}
          srcSet={`${heroSm} 640w, ${heroLg} 1300w`}
          sizes="100vw"
          alt="A single long banquet table glowing under string lights at dusk in a Scottsdale courtyard"
          fetchPriority="high"
          decoding="async"
          width="1300"
          height="1940"
        />
        <div className="hero__veil" aria-hidden="true" />
      </div>

      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">Phoenix · Scottsdale · Sedona · Tucson</span>
        <h1 className="hero__title">
          Weddings worthy of <em className="script hero__accent">the desert</em>
        </h1>
        <p className="hero__lede">
          Le Rêve is a full-service wedding planning and design studio producing extraordinary
          celebrations across all of Arizona — with a calendar deliberately kept small.
        </p>
        <div className="hero__actions">
          <Link to="/consultation" className="btn btn--gold">
            Book a Consultation
          </Link>
          <Link to="/services" className="btn btn--ghost">
            View Services
          </Link>
        </div>

        <ul className="hero__marks">
          <li>5 years in Arizona</li>
          <li>210+ weddings</li>
          <li>22 dates a year</li>
        </ul>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section intro">
      <div className="container intro__grid">
        <Reveal className="intro__copy">
          <span className="eyebrow">The studio</span>
          <h2>
            A planner who knows this <em className="script">landscape</em>
          </h2>
          <p className="lede">
            Arizona is not a neutral backdrop. It is 112° in July and 38° after sundown in
            January. It is monsoon cells that arrive in forty minutes and light at 6:40pm that
            no photographer anywhere else can buy.
          </p>
          <p>
            We have spent five years learning how to build a wedding that works with all of
            it — shade plans and backup builds written into the first draft, vendors who have
            loaded in at that venue thirty times, and a design language drawn from the desert
            rather than imported onto it.
          </p>
          <Link to="/about" className="link-underline">
            Meet the team
          </Link>
        </Reveal>

        <Reveal className="intro__art" delay={120}>
          <Photo slug="couple-dunes" size="lg" className="intro__frame" />
          <Photo slug="bouquet-dried-desert" className="intro__frame intro__frame--offset" />
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="stats__item" delay={i * 90}>
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="section section--tint">
      <div className="container">
        <Reveal className="text-center">
          <span className="eyebrow">What we do</span>
          <h2>
            Three ways to <em className="script">work together</em>
          </h2>
          <p className="lede">
            Every couple arrives at a different point. Choose the level of support that meets
            you where you are — each one comes with the full studio behind it.
          </p>
        </Reveal>

        <div className="svc-preview">
          {SERVICES.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 110}>
              <article className={`card svc-card${s.featured ? " svc-card--featured" : ""}`}>
                {s.featured && <span className="svc-card__badge">Most chosen</span>}
                <div className="svc-card__body">
                  <h3>{s.name}</h3>
                  <p className="svc-card__meta">
                    {s.price} · {s.duration}
                  </p>
                  <p>{s.summary}</p>
                  <ul className="svc-card__list">
                    {s.includes.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link to={`/services#${s.slug}`} className="link-underline">
                    Full details
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center svc-preview__more">
          <Link to="/services" className="btn btn--primary">
            All six services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process">
      <div className="container">
        <Reveal className="text-center">
          <span className="eyebrow">The process</span>
          <h2>
            From first hello to <em className="script">last dance</em>
          </h2>
        </Reveal>

        <ol className="process__list">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.step} className="process__item" delay={i * 100}>
              <span className="process__step">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section className="section section--ink quotes">
      <div className="quotes__glow" aria-hidden="true" />
      <div className="container container--narrow text-center quotes__inner">
        <span className="eyebrow">Our couples</span>
        <blockquote key={active} className="quotes__quote">
          <p>“{t.quote}”</p>
          <cite>
            <span className="quotes__name">{t.name}</span>
            <span className="quotes__detail">{t.detail}</span>
          </cite>
        </blockquote>
        <div className="quotes__dots" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial from ${item.name}`}
              className={`quotes__dot${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Regions() {
  return (
    <section className="section section--tint">
      <div className="container">
        <Reveal className="text-center">
          <span className="eyebrow">Where we work</span>
          <h2>
            The whole state, <em className="script">end to end</em>
          </h2>
          <p className="lede">
            Travel anywhere within Arizona is included in every package — there is no such thing
            as an out-of-area date for us.
          </p>
        </Reveal>

        <div className="regions">
          {REGIONS.map((r, i) => (
            <Reveal key={r.city} className="regions__item" delay={i * 60}>
              <h3>{r.city}</h3>
              <p>{r.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  const posts = NEWS.slice(0, 3);
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">From the journal</span>
            <h2>
              Notes on planning <em className="script">in Arizona</em>
            </h2>
          </div>
          <Link to="/news" className="link-underline">
            Read everything
          </Link>
        </Reveal>

        <div className="post-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link to={`/news/${p.slug}`} className="card post-card">
                <Photo slug={p.photo} zoom className="post-card__media" />
                <div className="post-card__body">
                  <span className="post-card__tag">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="post-card__meta">
                    {formatDate(p.date)} · {p.readTime}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Stats />
      <ServicesPreview />
      <Process />
      <Testimonials />
      <Regions />
      <JournalPreview />
      <CTABand />
    </>
  );
}
