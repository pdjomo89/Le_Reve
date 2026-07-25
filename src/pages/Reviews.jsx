import { useCallback, useEffect, useState } from "react";

import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Stars, { StarPicker } from "../components/Stars.jsx";

const EMPTY = {
  name: "",
  email: "",
  rating: 0,
  headline: "",
  body: "",
  eventDetail: "",
};

function formatMonth(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function Reviews() {
  const [data, setData] = useState({ reviews: [], count: 0, average: 0 });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      if (!res.ok) throw new Error(String(res.status));
      setData(await res.json());
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const onChange = (e) => update(e.target.name, e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await res.json().catch(() => ({}));

      if (res.status === 400 && payload.errors) {
        setErrors(payload.errors);
        return;
      }
      if (!res.ok) {
        setSubmitError(payload.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      setForm(EMPTY);
    } catch {
      setSubmitError("We couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-reviews">
      <PageHeader
        photo="rings-keepsake"
        eyebrow="Reviews"
        title="In their"
        accent="own words"
        lede="Every review below comes from a couple whose wedding we produced. If we planned yours, we would love to hear how it went — the good and the honest."
      />

      <section className="section">
        <div className="container reviews__layout">
          <div className="reviews__list-col">
            {!loading && data.count > 0 && (
              <Reveal className="reviews__summary">
                <span className="reviews__average">{data.average.toFixed(1)}</span>
                <span className="reviews__summary-meta">
                  <Stars value={Math.round(data.average)} />
                  <span>
                    {data.count} {data.count === 1 ? "review" : "reviews"}
                  </span>
                </span>
              </Reveal>
            )}

            {loading && <p className="reviews__note">Loading reviews…</p>}

            {loadError && (
              <p className="reviews__note">
                We couldn't load reviews just now.{" "}
                <button type="button" className="link-underline" onClick={load}>
                  Try again
                </button>
              </p>
            )}

            {!loading && !loadError && data.count === 0 && (
              <p className="reviews__note">
                No reviews published yet — yours could be the first.
              </p>
            )}

            <ul className="reviews__list">
              {data.reviews.map((r, i) => (
                <Reveal key={r.id} as="li" className="review-card" delay={i * 60}>
                  <Stars value={r.rating} />
                  {r.headline && <h3 className="review-card__headline">{r.headline}</h3>}
                  <p className="review-card__body">{r.body}</p>
                  <p className="review-card__meta">
                    <strong>{r.name}</strong>
                    {r.event_detail ? ` · ${r.event_detail}` : ""}
                    {r.created_at ? ` · ${formatMonth(r.created_at)}` : ""}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="reviews__form-col" delay={120}>
            {sent ? (
              <div className="reviews__form reviews__thanks">
                <span aria-hidden="true" className="consult-success__mark">
                  ✦
                </span>
                <h2>Thank you</h2>
                <p>
                  Your review has been received. We read each one before it goes up, so it
                  will appear here shortly.
                </p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setSent(false)}
                >
                  Write another
                </button>
              </div>
            ) : (
              <form className="reviews__form" onSubmit={onSubmit} noValidate>
                <h2>Rate your experience</h2>

                <div className="field">
                  <span className="field__label">Your rating</span>
                  <StarPicker
                    value={form.rating}
                    onChange={(v) => update("rating", v)}
                    describedBy={errors.rating ? "rating-error" : undefined}
                  />
                  {errors.rating && (
                    <span className="field-error" id="rating-error">
                      {errors.rating}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="rv-name">Your name</label>
                  <input
                    id="rv-name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    aria-invalid={!!errors.name}
                    maxLength={80}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="rv-email">Email (optional)</label>
                  <input
                    id="rv-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    aria-invalid={!!errors.email}
                    maxLength={160}
                  />
                  <span className="field-hint">Never published — only so we can reply.</span>
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="rv-event">Venue &amp; date (optional)</label>
                  <input
                    id="rv-event"
                    name="eventDetail"
                    value={form.eventDetail}
                    onChange={onChange}
                    placeholder="The Phoenician, Scottsdale · June 2026"
                    maxLength={160}
                  />
                </div>

                <div className="field">
                  <label htmlFor="rv-headline">Headline (optional)</label>
                  <input
                    id="rv-headline"
                    name="headline"
                    value={form.headline}
                    onChange={onChange}
                    maxLength={120}
                  />
                </div>

                <div className="field">
                  <label htmlFor="rv-body">Your review</label>
                  <textarea
                    id="rv-body"
                    name="body"
                    rows={6}
                    value={form.body}
                    onChange={onChange}
                    aria-invalid={!!errors.body}
                    maxLength={2000}
                  />
                  {errors.body && <span className="field-error">{errors.body}</span>}
                </div>

                {submitError && <p className="field-error">{submitError}</p>}

                <button type="submit" className="btn btn--gold" disabled={submitting}>
                  {submitting ? "Sending…" : "Submit review"}
                </button>

                <p className="consult__fineprint">
                  Reviews are read before they are published. Your email is never shown.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
