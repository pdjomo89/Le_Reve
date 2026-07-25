import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import CTABand from "../components/CTABand.jsx";
import { gallery, galleryCategories } from "../data/photos.js";

function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.caption}>
      <button
        type="button"
        className="lightbox__scrim"
        aria-label="Close"
        onClick={onClose}
        tabIndex={-1}
      />

      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onStep(-1)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <figure className="lightbox__figure">
        <img src={item.lg} alt={item.alt} />
        <figcaption>
          <span className="lightbox__caption">{item.caption}</span>
          <span className="lightbox__meta">
            {item.location} · {item.category}
          </span>
          <span className="lightbox__count">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onStep(1)}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(-1);

  const items = useMemo(
    () => (category === "All" ? gallery : gallery.filter((p) => p.category === category)),
    [category],
  );

  const step = useCallback(
    (dir) => setOpen((i) => (i + dir + items.length) % items.length),
    [items.length],
  );

  const close = useCallback(() => setOpen(-1), []);

  // Changing filter while the lightbox is open would desync the index.
  useEffect(() => setOpen(-1), [category]);

  return (
    <>
      <PageHeader
        photo="aisle-hydrangea"
        eyebrow="Gallery"
        title="A few of the days"
        accent="we've built"
        lede="Ceremonies, tablescapes, florals and the small details that take the longest to get right — across the whole state, from Old Town courtyards to the red rock."
      />

      <section className="section gallery">
        <div className="container">
          <Reveal className="gallery__filters" role="group" aria-label="Filter by category">
            {galleryCategories.map((c) => (
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
          </Reveal>

          <div className="gallery__grid">
            {items.map((p, i) => (
              <Reveal
                key={p.slug}
                className="gallery__cell"
                delay={(i % 3) * 80}
              >
                <button
                  type="button"
                  className="gallery__item frame frame--zoom"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${p.caption}`}
                >
                  <img src={p.sm} alt={p.alt} loading="lazy" decoding="async" />
                  <span className="gallery__overlay">
                    <span className="gallery__caption">{p.caption}</span>
                    <span className="gallery__location">{p.location}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-center">Nothing in this category yet.</p>
          )}
        </div>
      </section>

      {open > -1 && <Lightbox items={items} index={open} onClose={close} onStep={step} />}

      <CTABand
        eyebrow="Your turn"
        title="Let's build"
        accent="yours"
        body="Every one of these started as a conversation about two people and a date. Bring us yours."
      />
    </>
  );
}
