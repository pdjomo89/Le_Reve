import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { BRAND } from "../data/site.js";
import logoLight from "../assets/logo-light.webp";

export default function CTABand({
  eyebrow = "Let's begin",
  title = "Tell us about",
  accent = "your day",
  body = "The first conversation is complimentary, sixty minutes, and entirely without obligation. Bring a Pinterest board or bring nothing at all.",
}) {
  return (
    <section className="section section--ink cta-band">
      <div className="cta-band__glow" aria-hidden="true" />
      <img src={logoLight} alt="" aria-hidden="true" className="cta-band__watermark" />
      <Reveal className="container text-center cta-band__inner">
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {title} <em className="script cta-band__accent">{accent}</em>
        </h2>
        <p className="lede">{body}</p>
        <div className="cta-band__actions">
          <Link to="/consultation" className="btn btn--gold">
            Book a Consultation
          </Link>
          <a href={BRAND.phoneHref} className="btn btn--ghost">
            {BRAND.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
