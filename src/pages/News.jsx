import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import CTABand from "../components/CTABand.jsx";
import { NEWS } from "../data/site.js";
import { formatDate } from "../lib/format.js";

export default function News() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(NEWS.map((n) => n.category)))],
    [],
  );

  const sorted = useMemo(
    () => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  const featured = sorted.find((n) => n.featured) ?? sorted[0];

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [sorted, category, query]);

  return (
    <>
      <PageHeader
        photo="stationery-wax-seal"
        eyebrow="Journal"
        title="News, notes &"
        accent="desert wisdom"
        lede="Palette studies, permit walkthroughs, real budget numbers and studio news — written by the people actually producing these weddings."
      />

      <section className="section news-featured">
        <div className="container">
          <Reveal>
            <Link to={`/news/${featured.slug}`} className="feature">
              <Photo slug={featured.photo} size="lg" zoom className="feature__media" />
              <div className="feature__body">
                <span className="post-card__tag">Featured · {featured.category}</span>
                <h2>{featured.title}</h2>
                <p className="lede">{featured.excerpt}</p>
                <span className="post-card__meta">
                  {formatDate(featured.date)} · {featured.readTime}
                </span>
                <span className="link-underline feature__link">Read the piece</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="news-controls">
            <div className="news-filters" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip${category === c ? " is-active" : ""}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="news-search">
              <label className="sr-only" htmlFor="news-search">
                Search the journal
              </label>
              <input
                id="news-search"
                type="search"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </Reveal>

          {posts.length === 0 ? (
            <Reveal className="text-center news-empty">
              <h3>Nothing matches that yet</h3>
              <p>Try a different category, or clear the search.</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Reset filters
              </button>
            </Reveal>
          ) : (
            <div className="post-grid">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 100}>
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
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Still reading"
        title="Let's talk about"
        accent="your date"
        body="Articles only go so far. Bring us your venue, your season and your guest count and we'll give you specifics."
      />
    </>
  );
}
