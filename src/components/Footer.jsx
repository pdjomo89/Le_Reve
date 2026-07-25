import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { BRAND, REGIONS, SERVICES } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo variant="light" size="lg" />
          <p>
            Luxury wedding planning, design and production for couples marrying anywhere in
            Arizona — from Old Town courtyards to red rock overlooks.
          </p>
          <p className="footer__meta">
            {BRAND.studio}
            <br />
            {BRAND.hours}
          </p>

          <ul className="footer__social" aria-label="Follow Le Rêve">
            <li>
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Le Rêve on Facebook"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.9 3.78-3.9 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Le Rêve on Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-.65a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={BRAND.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Le Rêve on TikTok"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.34a2.35 2.35 0 0 1-2.35 2.35 2.35 2.35 0 1 1 .65-4.61v-3.17a5.5 5.5 0 1 0 4.8 5.45V9.01a7.36 7.36 0 0 0 4.3 1.38V7.29a4.29 4.29 0 0 1-3.25-1.47Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/about">About the studio</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/news">Journal</Link>
            </li>
            <li>
              <Link to="/consultation">Book a consultation</Link>
            </li>
            <li>
              <Link to="/services#faq">Questions</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={BRAND.phoneHref}>{BRAND.phone}</a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </li>
            <li>{BRAND.instagram}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__regions">
        <span className="footer__regions-label">Serving all of Arizona</span>
        <span className="footer__regions-list">
          {REGIONS.map((r) => r.city).join(" · ")}
        </span>
      </div>

      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} {BRAND.name} Weddings. All rights reserved.
        </span>
        <span className="script footer__sig">Made with care in the Sonoran Desert</span>
      </div>
    </footer>
  );
}
