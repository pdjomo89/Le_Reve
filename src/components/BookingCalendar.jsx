import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

import { BRAND } from "../data/site.js";

const CAL_NAMESPACE = "consultation";

/**
 * Cal.com inline booking calendar.
 *
 * Slots the couple sees are whatever Cal.com reports as free — once a time is
 * booked (here or on the connected Google Calendar) Cal.com stops offering it,
 * so double-booking is prevented upstream rather than by us.
 *
 * `intake` carries the answers already given in the enquiry form so the couple
 * doesn't retype their name and email, and so the booking lands with context.
 */
export default function BookingCalendar({ intake, onBooked }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Must match the <Cal namespace> below — without it the ui/on calls
        // target the default namespace, whose iframe this page never creates.
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;

        // Match the embed to the site rather than Cal's stock blue.
        cal("ui", {
          theme: "light",
          cssVarsPerTheme: {
            light: {
              "cal-brand": "#9e7c33",
              "cal-text": "#10262b",
              "cal-text-emphasis": "#10262b",
              "cal-border": "rgba(16, 38, 43, 0.12)",
              "cal-bg": "#ffffff",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        if (onBooked) {
          cal("on", {
            action: "bookingSuccessful",
            callback: (e) => onBooked(e?.detail?.data ?? null),
          });
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onBooked]);

  const name = [intake?.partnerOne, intake?.partnerTwo].filter(Boolean).join(" & ");

  if (failed) {
    return (
      <div className="booking-cal booking-cal--fallback">
        <p className="lede">
          Our booking calendar didn't load. Call us on{" "}
          <a href={BRAND.phoneHref}>{BRAND.phone}</a> or email{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> and we'll find a time by hand.
        </p>
      </div>
    );
  }

  return (
    <div className="booking-cal">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={BRAND.calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          name,
          email: intake?.email ?? "",
          notes: buildNotes(intake),
          theme: "light",
          layout: "month_view",
        }}
      />
    </div>
  );
}

/** Fold the enquiry answers into the booking so the call starts informed. */
function buildNotes(intake) {
  if (!intake) return "";
  const lines = [
    ["Wedding date", intake.date || (intake.flexible ? "Flexible" : "")],
    ["Region", intake.region],
    ["Venue", intake.venue],
    ["Guests", intake.guests],
    ["Budget", intake.budget],
    ["Service", intake.service],
    ["Heard via", intake.heard],
    ["Notes", intake.message],
  ];
  return lines
    .filter(([, value]) => String(value ?? "").trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}
