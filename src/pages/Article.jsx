import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import CTABand from "../components/CTABand.jsx";
import NotFound from "./NotFound.jsx";
import { formatDate } from "../lib/format.js";
import { NEWS } from "../data/site.js";

export default function Article() {
  const { slug } = useParams();
  const index = NEWS.findIndex((n) => n.slug === slug);

  if (index === -1) {
    return <NotFound message="We couldn't find that article." />;
  }

  const post = NEWS[index];
  const related = NEWS.filter((n) => n.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="article">
        <header className="article__header">
          <div className="page-header__glow" aria-hidden="true" />
          <div className="container container--narrow text-center">
            <span className="eyebrow">{post.category}</span>
            <h1 className="article__title">{post.title}</h1>
            <p className="article__meta">
              {formatDate(post.date)} · {post.readTime}
            </p>
          </div>
        </header>

        <div className="container article__hero">
          <Photo slug={post.photo} size="lg" priority className="article__frame" />
        </div>

        <div className="container container--narrow article__body">
          <p className="article__lede">{post.excerpt}</p>
          {post.body.map((para, i) => (
            <Reveal as="p" key={i} delay={i * 40}>
              {para}
            </Reveal>
          ))}

          <div className="article__foot">
            <Link to="/news" className="link-underline">
              ← Back to the journal
            </Link>
          </div>
        </div>
      </article>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Keep reading</span>
            <h2>
              More from the <em className="script">journal</em>
            </h2>
          </Reveal>
          <div className="post-grid post-grid--two">
            {related.map((p, i) => (
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

      <CTABand />
    </>
  );
}
