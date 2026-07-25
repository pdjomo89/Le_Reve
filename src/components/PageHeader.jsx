import { photo as lookup } from "../data/photos.js";

/**
 * The banner at the top of every inner page.
 *
 * With `photo` it becomes a full-bleed image hero; without one it falls back to
 * the turquoise/gold gradient. The scrim is heavier than the home hero's because
 * this copy is centred over the whole frame rather than tucked into one column.
 */
export default function PageHeader({ eyebrow, title, accent, lede, photo }) {
  const image = photo ? lookup(photo) : null;

  return (
    <section className={`page-header${image ? " page-header--photo" : ""}`}>
      {image ? (
        <div className="page-header__media" aria-hidden="true">
          <img src={image.lg} alt="" fetchPriority="high" decoding="async" />
          <div className="page-header__scrim" />
        </div>
      ) : (
        <div className="page-header__glow" aria-hidden="true" />
      )}

      <div className="container page-header__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>
          {title}
          {accent && (
            <>
              {" "}
              <em className="script page-header__accent">{accent}</em>
            </>
          )}
        </h1>
        {lede && <p className="lede page-header__lede">{lede}</p>}
      </div>
    </section>
  );
}
