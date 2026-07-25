import { useCallback, useEffect, useState } from "react";

import Stars from "../components/Stars.jsx";

const TABS = ["pending", "approved", "rejected"];
const STORAGE_KEY = "lereve.reviewsAdminPassword";

/**
 * Moderation screen. The password is held in sessionStorage only — it is sent
 * per-request as a header and never becomes part of a URL.
 */
export default function AdminReviews() {
  const [password, setPassword] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) || "",
  );
  const [draftPassword, setDraftPassword] = useState("");
  const [tab, setTab] = useState("pending");
  const [state, setState] = useState({ reviews: [], counts: {} });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const load = useCallback(
    async (pw, which) => {
      if (!pw) return;
      setStatus("loading");
      setError("");
      try {
        const res = await fetch(`/api/admin/reviews?status=${which}`, {
          headers: { "x-admin-password": pw },
        });
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setPassword("");
          setError("That password wasn't accepted.");
          setStatus("idle");
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        setState(await res.json());
        setStatus("ready");
      } catch {
        setError("Could not load reviews.");
        setStatus("idle");
      }
    },
    [],
  );

  useEffect(() => {
    if (password) load(password, tab);
  }, [password, tab, load]);

  const signIn = (e) => {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, draftPassword);
    setPassword(draftPassword);
    setDraftPassword("");
  };

  const act = async (id, action) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Drop it from the current list rather than refetching the whole page.
      setState((s) => ({
        ...s,
        reviews: s.reviews.filter((r) => r.id !== id),
      }));
    } catch {
      setError("That change didn't save.");
    }
  };

  if (!password) {
    return (
      <div className="page-admin">
        <div className="container admin__gate">
          <h1>Review moderation</h1>
          <form onSubmit={signIn} className="reviews__form">
            <div className="field">
              <label htmlFor="admin-pw">Password</label>
              <input
                id="admin-pw"
                type="password"
                value={draftPassword}
                onChange={(e) => setDraftPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <span className="field-error">{error}</span>}
            <button type="submit" className="btn btn--gold">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-admin">
      <div className="container admin__wrap">
        <header className="admin__head">
          <h1>Review moderation</h1>
          <nav className="admin__tabs">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`admin__tab${t === tab ? " is-active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
                {typeof state.counts?.[t] === "number" ? ` (${state.counts[t]})` : ""}
              </button>
            ))}
          </nav>
        </header>

        {error && <p className="field-error">{error}</p>}
        {status === "loading" && <p className="reviews__note">Loading…</p>}
        {status === "ready" && state.reviews.length === 0 && (
          <p className="reviews__note">Nothing {tab}.</p>
        )}

        <ul className="admin__list">
          {state.reviews.map((r) => (
            <li key={r.id} className="review-card admin__item">
              <Stars value={r.rating} />
              {r.headline && <h3 className="review-card__headline">{r.headline}</h3>}
              <p className="review-card__body">{r.body}</p>
              <p className="review-card__meta">
                <strong>{r.name}</strong>
                {r.email ? ` · ${r.email}` : ""}
                {r.event_detail ? ` · ${r.event_detail}` : ""}
              </p>
              <div className="admin__actions">
                {tab !== "approved" && (
                  <button
                    type="button"
                    className="btn btn--gold"
                    onClick={() => act(r.id, "approve")}
                  >
                    Approve
                  </button>
                )}
                {tab !== "rejected" && (
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => act(r.id, "reject")}
                  >
                    Reject
                  </button>
                )}
                {tab !== "pending" && (
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => act(r.id, "pend")}
                  >
                    Back to pending
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
