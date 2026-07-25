import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import BookingCalendar from "../components/BookingCalendar.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import Photo from "../components/Photo.jsx";
import {
  BRAND,
  BUDGET_RANGES,
  GUEST_RANGES,
  HOW_HEARD,
  REGIONS,
  SERVICES,
} from "../data/site.js";

const STEPS = ["You two", "The day", "The details", "Pick a time"];

/** Index of the booking-calendar step — the last one, after the enquiry answers. */
const CALENDAR_STEP = STEPS.length - 1;

const EMPTY = {
  partnerOne: "",
  partnerTwo: "",
  email: "",
  phone: "",
  date: "",
  flexible: false,
  region: "",
  venue: "",
  guests: "",
  budget: "",
  service: "",
  heard: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fields that must be valid before each step may be left. */
const REQUIRED_BY_STEP = [
  ["partnerOne", "partnerTwo", "email"],
  ["region", "guests"],
  ["service"],
];

function validate(form, fields) {
  const errors = {};
  for (const key of fields) {
    const value = form[key];
    if (!String(value).trim()) {
      errors[key] = "This one's required.";
    } else if (key === "email" && !EMAIL_RE.test(form.email)) {
      errors[key] = "That email doesn't look right.";
    }
  }
  return errors;
}

function Field({ label, name, error, children, hint }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/** Cal.com reports the chosen slot in a few shapes depending on event type. */
function bookedWhen(booking) {
  const raw = booking?.startTime ?? booking?.date ?? booking?.booking?.startTime;
  if (!raw) return null;
  const when = new Date(raw);
  return Number.isNaN(when.getTime())
    ? null
    : when.toLocaleString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function Success({ form, booking, onReset }) {
  const when = bookedWhen(booking);
  return (
    <Reveal className="consult-success">
      <span className="consult-success__mark" aria-hidden="true">
        ✦
      </span>
      <h2>
        Thank you, <em className="script">{form.partnerOne.split(" ")[0]}</em>
      </h2>
      <p className="lede">
        {when
          ? `Your consultation is confirmed for ${when}. It's in Fonda's diary and a calendar invitation is on its way to ${form.email}.`
          : `Your consultation is booked. Confirmation and calendar invitation are on their way to ${form.email}.`}
      </p>
      <div className="consult-success__recap">
        {when && (
          <div>
            <span>Consultation</span>
            <strong>{when}</strong>
          </div>
        )}
        <div>
          <span>Date</span>
          <strong>{form.date ? new Date(form.date).toDateString() : "Still deciding"}</strong>
        </div>
        <div>
          <span>Region</span>
          <strong>{form.region}</strong>
        </div>
        <div>
          <span>Guests</span>
          <strong>{form.guests}</strong>
        </div>
        <div>
          <span>Service</span>
          <strong>{form.service}</strong>
        </div>
      </div>
      <div className="consult-success__actions">
        <Link to="/services" className="btn btn--primary">
          Browse services
        </Link>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Submit another
        </button>
      </div>
    </Reveal>
  );
}

export default function Consultation() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [booking, setBooking] = useState(null);

  const handleBooked = useCallback((detail) => {
    setBooking(detail);
    setSent(true);
  }, []);

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    update(name, type === "checkbox" ? checked : value);
  };

  const next = () => {
    const found = validate(form, REQUIRED_BY_STEP[step]);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStep((s) => Math.min(s + 1, CALENDAR_STEP - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(form, REQUIRED_BY_STEP.flat());
    if (Object.keys(found).length) {
      setErrors(found);
      // Jump back to the earliest step that still has a problem.
      const bad = REQUIRED_BY_STEP.findIndex((keys) => keys.some((k) => found[k]));
      setStep(bad === -1 ? step : bad);
      return;
    }
    // Answers are good — hand over to Cal.com to choose a slot. The booking
    // itself (and blocking that slot) happens there, not here.
    setStep(CALENDAR_STEP);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStep(0);
    setSent(false);
    setBooking(null);
  };

  return (
    <div className="page-consult">
      <PageHeader
        photo="bouquet-peach"
        eyebrow="Consultation"
        title="Let's start"
        accent="the conversation"
        lede="Sixty complimentary minutes, in our Scottsdale studio or over video. Tell us a little below and we'll come to the call already knowing your date, your venue and your numbers."
      />

      <section className="section consult">
        <div className="container consult__grid">
          <div className="consult__form-wrap">
            {sent ? (
              <Success form={form} booking={booking} onReset={reset} />
            ) : (
              <Reveal>
                <ol className="stepper" aria-label="Form progress">
                  {STEPS.map((label, i) => (
                    <li
                      key={label}
                      className={`stepper__item${i === step ? " is-active" : ""}${
                        i < step ? " is-done" : ""
                      }`}
                      aria-current={i === step ? "step" : undefined}
                    >
                      <span className="stepper__dot">{i < step ? "✓" : i + 1}</span>
                      <span className="stepper__label">{label}</span>
                    </li>
                  ))}
                </ol>

                {step === CALENDAR_STEP ? (
                  <div className="consult__form consult__step--calendar">
                    <h2>Choose a time that suits</h2>
                    <p className="consult__cal-lede">
                      Every time shown is genuinely free in Fonda's diary. Book one and it's
                      blocked for everyone else immediately.
                    </p>
                    <BookingCalendar intake={form} onBooked={handleBooked} />
                    <div className="consult__nav">
                      <button type="button" className="btn btn--ghost" onClick={back}>
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                <form className="consult__form" onSubmit={onSubmit} noValidate>
                  {step === 0 && (
                    <div className="consult__step">
                      <h2>Who are we celebrating?</h2>
                      <div className="grid-2">
                        <Field label="Your name" name="partnerOne" error={errors.partnerOne}>
                          <input
                            id="partnerOne"
                            name="partnerOne"
                            value={form.partnerOne}
                            onChange={onChange}
                            aria-invalid={Boolean(errors.partnerOne)}
                            autoComplete="name"
                          />
                        </Field>
                        <Field label="Partner's name" name="partnerTwo" error={errors.partnerTwo}>
                          <input
                            id="partnerTwo"
                            name="partnerTwo"
                            value={form.partnerTwo}
                            onChange={onChange}
                            aria-invalid={Boolean(errors.partnerTwo)}
                          />
                        </Field>
                      </div>
                      <div className="grid-2">
                        <Field label="Email" name="email" error={errors.email}>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            aria-invalid={Boolean(errors.email)}
                            autoComplete="email"
                          />
                        </Field>
                        <Field
                          label="Phone"
                          name="phone"
                          error={errors.phone}
                          hint="Optional — for a faster reply"
                        >
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={onChange}
                            autoComplete="tel"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="consult__step">
                      <h2>Tell us about the day</h2>
                      <div className="grid-2">
                        <Field
                          label="Wedding date"
                          name="date"
                          error={errors.date}
                          hint="Leave blank if it's not set"
                        >
                          <input
                            id="date"
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={onChange}
                          />
                        </Field>
                        <Field label="Region in Arizona" name="region" error={errors.region}>
                          <select
                            id="region"
                            name="region"
                            value={form.region}
                            onChange={onChange}
                            aria-invalid={Boolean(errors.region)}
                          >
                            <option value="">Choose a region…</option>
                            {REGIONS.map((r) => (
                              <option key={r.city} value={r.city}>
                                {r.city}
                              </option>
                            ))}
                            <option value="Not sure yet">Not sure yet</option>
                          </select>
                        </Field>
                      </div>

                      <label className="checkbox">
                        <input
                          type="checkbox"
                          name="flexible"
                          checked={form.flexible}
                          onChange={onChange}
                        />
                        <span>Our date is flexible</span>
                      </label>

                      <Field
                        label="Venue"
                        name="venue"
                        error={errors.venue}
                        hint="Booked, shortlisted, or wide open"
                      >
                        <input id="venue" name="venue" value={form.venue} onChange={onChange} />
                      </Field>

                      <div className="grid-2">
                        <Field label="Guest count" name="guests" error={errors.guests}>
                          <select
                            id="guests"
                            name="guests"
                            value={form.guests}
                            onChange={onChange}
                            aria-invalid={Boolean(errors.guests)}
                          >
                            <option value="">Choose a range…</option>
                            {GUEST_RANGES.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Overall budget" name="budget" error={errors.budget}>
                          <select
                            id="budget"
                            name="budget"
                            value={form.budget}
                            onChange={onChange}
                          >
                            <option value="">Choose a range…</option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="consult__step">
                      <h2>A few last details</h2>
                      <Field label="Service you're considering" name="service" error={errors.service}>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={onChange}
                          aria-invalid={Boolean(errors.service)}
                        >
                          <option value="">Choose one…</option>
                          {SERVICES.map((s) => (
                            <option key={s.slug} value={s.name}>
                              {s.name} — {s.price}
                            </option>
                          ))}
                          <option value="Help me decide">Help me decide</option>
                        </select>
                      </Field>

                      <Field label="How did you hear about us?" name="heard" error={errors.heard}>
                        <select id="heard" name="heard" value={form.heard} onChange={onChange}>
                          <option value="">Optional…</option>
                          {HOW_HEARD.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field
                        label="Anything else?"
                        name="message"
                        error={errors.message}
                        hint="Cultural ceremonies, family logistics, the feeling you're after — all of it helps"
                      >
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={onChange}
                        />
                      </Field>
                    </div>
                  )}

                  <div className="consult__nav">
                    {step > 0 && (
                      <button type="button" className="btn btn--ghost" onClick={back}>
                        Back
                      </button>
                    )}
                    {step < CALENDAR_STEP - 1 ? (
                      <button type="button" className="btn btn--primary" onClick={next}>
                        Continue
                      </button>
                    ) : (
                      <button type="submit" className="btn btn--gold">
                        Choose a time
                      </button>
                    )}
                  </div>

                  <p className="consult__fineprint">
                    We reply within one business day. Your details are never shared with vendors
                    without your say-so.
                  </p>
                </form>
                )}
              </Reveal>
            )}
          </div>

          <Reveal className="consult__aside" delay={140}>
            <Photo slug="rings-fern" className="consult__art" />

            <div className="consult__panel">
              <h3>What to expect</h3>
              <ol className="numbered">
                <li>A 60-minute conversation, free and without obligation.</li>
                <li>An honest read on whether your budget matches your vision.</li>
                <li>Two or three venue directions specific to your date and season.</li>
                <li>A written proposal within three days if it feels right.</li>
              </ol>
            </div>

            <div className="consult__panel consult__panel--ink">
              <h3>Rather just talk?</h3>
              <p>Call the studio directly — we answer during business hours.</p>
              <a href={BRAND.phoneHref} className="consult__phone">
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="link-underline">
                {BRAND.email}
              </a>
              <p className="consult__hours">{BRAND.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
