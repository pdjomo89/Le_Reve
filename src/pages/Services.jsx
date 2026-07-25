import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import CTABand from "../components/CTABand.jsx";
import { FAQS, PROCESS, SERVICES } from "../data/site.js";

/** One image per service, in the order SERVICES is declared. */
const SERVICE_PHOTOS = [
  "place-setting-terracotta", // day-of coordination
  "aisle-hydrangea", // partial planning
  "long-table-dusk", // full-service planning
];

function ServiceRow({ service, index }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal as="article" id={service.slug} className={`svc-row${flipped ? " svc-row--flip" : ""}`}>
      <div className="svc-row__art">
        <Photo slug={SERVICE_PHOTOS[index % SERVICE_PHOTOS.length]} zoom className="svc-row__frame" />
        <span className="svc-row__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="svc-row__copy">
        <span className="eyebrow">{service.duration}</span>
        <h2>{service.name}</h2>
        <p className="svc-row__price">{service.price}</p>
        <p className="lede">{service.summary}</p>

        <h4 className="svc-row__subhead">What's included</h4>
        <ul className="tick-list">
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Link to="/consultation" className="btn btn--primary svc-row__cta">
          Enquire about this package
        </Link>
      </div>
    </Reveal>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section section--tint">
      <div className="container container--narrow">
        <Reveal className="text-center">
          <span className="eyebrow">Questions</span>
          <h2>
            Before you <em className="script">reach out</em>
          </h2>
        </Reveal>

        <div className="faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className={`faq__item${isOpen ? " is-open" : ""}`} delay={i * 60}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && <p className="faq__a">{f.a}</p>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader
        photo="arch-white-mountains"
        eyebrow="Services"
        title="Planning built"
        accent="around you"
        lede="Three packages, one studio. Whether you need a complete production partner or a steady hand for the wedding day itself, the same team and the same standard shows up."
      />

      <section className="section svc-index">
        <div className="container">
          <Reveal className="svc-index__grid">
            {SERVICES.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="svc-index__pill">
                <span>{s.name}</span>
                <span className="svc-index__price">{s.price}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section svc-rows">
        <div className="container">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--ink process process--ink">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">However we work together</span>
            <h2>
              The same four <em className="script">movements</em>
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

      <Faq />
      <CTABand
        eyebrow="Next step"
        title="Find your"
        accent="package"
        body="Not sure which engagement fits? Tell us the date, the guest count and the venue — we'll recommend one honestly, even if it's the smallest."
      />
    </>
  );
}
