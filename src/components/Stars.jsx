const STAR = "★";
const VALUES = [1, 2, 3, 4, 5];

/** Read-only rating display. */
export default function Stars({ value, className = "" }) {
  const filled = Math.max(0, Math.min(5, Math.round(value || 0)));
  return (
    <span className={`stars${className ? ` ${className}` : ""}`}>
      <span className="stars__marks" aria-hidden="true">
        {VALUES.map((v) => (
          <span key={v} className={v <= filled ? "is-on" : undefined}>
            {STAR}
          </span>
        ))}
      </span>
      <span className="sr-only">{filled} out of 5 stars</span>
    </span>
  );
}

/**
 * Interactive rating input. Radios rather than buttons so the whole thing is
 * one keyboard-navigable group and submits/validates like any other field.
 */
export function StarPicker({ value, onChange, describedBy }) {
  return (
    <span
      className="stars stars--input"
      role="radiogroup"
      aria-label="Your rating"
      aria-describedby={describedBy}
    >
      {VALUES.map((v) => (
        <label key={v} className={`stars__pick${v <= value ? " is-on" : ""}`}>
          <input
            type="radio"
            name="rating"
            value={v}
            checked={value === v}
            onChange={() => onChange(v)}
          />
          <span aria-hidden="true">{STAR}</span>
          <span className="sr-only">{v} star{v === 1 ? "" : "s"}</span>
        </label>
      ))}
    </span>
  );
}
