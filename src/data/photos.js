/**
 * The photo library.
 *
 * Files live in `src/assets/photos/` as `<slug>-sm.webp` (640w, cards and grid
 * thumbnails) and `<slug>-lg.webp` (1300w, lightbox and full-bleed use). They
 * are pulled in with import.meta.glob so adding a photo means dropping in the
 * two files and adding a row to PHOTOS below — no import list to maintain.
 *
 * Every image is a licensed placeholder; see brand/CREDITS.md.
 */

const small = import.meta.glob("../assets/photos/*-sm.webp", {
  eager: true,
  import: "default",
});
const large = import.meta.glob("../assets/photos/*-lg.webp", {
  eager: true,
  import: "default",
});

function resolve(slug, set, suffix) {
  const hit = set[`../assets/photos/${slug}-${suffix}.webp`];
  if (!hit && import.meta.env.DEV) {
    console.warn(`[photos] missing asset: ${slug}-${suffix}.webp`);
  }
  return hit;
}

/** slug, alt text, gallery category, and the intrinsic aspect ratio (w / h). */
const PHOTOS = [
  {
    slug: "arch-autumn",
    category: "Ceremony",
    ratio: 0.67,
    caption: "Copper and bone ceremony arch",
    location: "Private estate, Cave Creek",
    alt: "A tall floral ceremony arch in copper and cream tones on a desert lawn",
  },
  {
    slug: "aisle-hydrangea",
    category: "Ceremony",
    ratio: 1.5,
    caption: "White hydrangea aisle",
    location: "Resort garden, Scottsdale",
    alt: "A ceremony aisle lined with banks of white hydrangea",
  },
  {
    slug: "arch-white-mountains",
    category: "Ceremony",
    ratio: 1.5,
    caption: "Ceremony above the valley",
    location: "Mountain terrace, Sedona",
    alt: "A white floral ceremony arch on a terrace overlooking distant mountains",
  },
  {
    slug: "aisle-runners",
    category: "Ceremony",
    ratio: 1.5,
    caption: "Woven runners and an autumn arch",
    location: "Vineyard estate, Prescott",
    alt: "An outdoor ceremony aisle with patterned woven runners leading to a floral arch",
  },
  {
    slug: "arch-timber",
    category: "Ceremony",
    ratio: 0.67,
    caption: "Timber arch at golden hour",
    location: "Palm grove, Phoenix",
    alt: "A carved timber wedding arch standing in a grove of palms",
  },
  {
    slug: "ceremony-shoreline",
    category: "Ceremony",
    ratio: 0.8,
    caption: "Twenty chairs and open water",
    location: "Lake Havasu",
    alt: "A small ceremony set-up of dark chairs and florals beside open water",
  },
  {
    slug: "place-setting-terracotta",
    category: "Reception",
    ratio: 1.5,
    caption: "Terracotta silk and rattan",
    location: "Hacienda del Sol, Tucson",
    alt: "A place setting with a terracotta silk napkin on a rattan charger",
  },
  {
    slug: "long-table-dusk",
    category: "Reception",
    ratio: 0.67,
    caption: "One long table, string light and dusk",
    location: "Courtyard, Old Town Scottsdale",
    alt: "A single long banquet table under string lights at dusk",
  },
  {
    slug: "table-eucalyptus",
    category: "Reception",
    ratio: 1.33,
    caption: "Eucalyptus in cut glass",
    location: "Studio design session",
    alt: "Eucalyptus and greenery arranged in cut glass vases on a pale wood table",
  },
  {
    slug: "table-candlelight",
    category: "Reception",
    ratio: 1.0,
    caption: "Brass candelabra and low florals",
    location: "Historic hall, Flagstaff",
    alt: "A reception table lit by tall brass candelabra with low floral runners",
  },
  {
    slug: "centrepiece-blush",
    category: "Reception",
    ratio: 0.75,
    caption: "Blush garden roses, raised",
    location: "Ballroom, The Phoenician",
    alt: "A tall blush garden rose and eucalyptus centrepiece on a reception table",
  },
  {
    slug: "bouquet-peach",
    category: "Florals",
    ratio: 1.5,
    caption: "Peach ranunculus and rosemary",
    location: "Bridal suite, Scottsdale",
    alt: "A soft peach bridal bouquet with rosemary and trailing greenery",
  },
  {
    slug: "bouquet-white",
    category: "Florals",
    ratio: 1.5,
    caption: "White garden roses and thistle",
    location: "Sam Hughes, Tucson",
    alt: "A bride holding a loose white garden rose and thistle bouquet",
  },
  {
    slug: "bouquet-dried-desert",
    category: "Florals",
    ratio: 0.67,
    caption: "Dried palm, pampas and ocotillo",
    location: "Studio, Scottsdale",
    alt: "A dried desert bouquet of palm, pampas grass and muted blooms",
  },
  {
    slug: "florals-moody",
    category: "Florals",
    ratio: 0.62,
    caption: "Blush and bone against dark",
    location: "Design book shoot",
    alt: "Pale roses and blossom arranged against a deep dark background",
  },
  {
    slug: "rings-fern",
    category: "Details",
    ratio: 1.5,
    caption: "Bands, fern and letterpress",
    location: "Getting-ready suite",
    alt: "Two wedding bands resting on a fern beside a letterpress invitation",
  },
  {
    slug: "stationery-wax-seal",
    category: "Details",
    ratio: 1.5,
    caption: "Wax seal and cotton stock",
    location: "Paper suite direction",
    alt: "A wedding invitation suite on cotton stock finished with a wax seal",
  },
  {
    slug: "rings-keepsake",
    category: "Details",
    ratio: 0.67,
    caption: "The keepsake box",
    location: "Morning of",
    alt: "Wedding rings displayed in a small glass and brass keepsake box",
  },
  {
    slug: "couple-desert-green",
    category: "Portraits",
    ratio: 0.67,
    caption: "First look in the wash",
    location: "Sonoran Preserve, Phoenix",
    alt: "A couple standing together in open desert at golden hour",
  },
  {
    slug: "couple-dunes",
    category: "Portraits",
    ratio: 0.67,
    caption: "An hour before the ceremony",
    location: "Dunes, Yuma",
    alt: "A couple seated together on sand dunes in late afternoon light",
  },
  {
    slug: "bride-bouquet-stone",
    category: "Portraits",
    ratio: 0.67,
    caption: "Bouquet against old stone",
    location: "Mission ruins, Tumacácori",
    alt: "A bride holding an autumn bouquet beside a weathered stone wall",
  },
  {
    slug: "couple-airstream",
    category: "Portraits",
    ratio: 0.67,
    caption: "Farewell send-off",
    location: "Route 66, Kingman",
    alt: "A couple leaning against a vintage silver trailer after their wedding",
  },

  /* Team portraits — `hidden` keeps them out of the gallery grid while still
     being addressable by slug. These are stock photographs of real people who
     do not work here; see brand/CREDITS.md. Replace before launch. */
  {
    slug: "team-fonda",
    category: "Team",
    ratio: 1,
    hidden: true,
    caption: "Fonda Kwocha",
    location: "Scottsdale studio",
    alt: "Portrait of Fonda Kwocha, founder and principal planner",
  },
  {
    slug: "team-noor",
    category: "Team",
    ratio: 1,
    hidden: true,
    caption: "Noor Haddad",
    location: "Scottsdale studio",
    alt: "Portrait of Noor Haddad, design director",
  },
  {
    slug: "team-tessa",
    category: "Team",
    ratio: 1,
    hidden: true,
    caption: "Tessa Lindqvist",
    location: "Sedona",
    alt: "Portrait of Tessa Lindqvist, northern Arizona lead",
  },
  {
    slug: "team-marcus",
    category: "Team",
    ratio: 1,
    hidden: true,
    caption: "Marcus Bell",
    location: "Production",
    alt: "Portrait of Marcus Bell, production manager",
  },
];

/** slug -> { sm, lg, alt, ... } for direct lookup by the pages. */
export const photos = Object.fromEntries(
  PHOTOS.map((p) => [
    p.slug,
    { ...p, sm: resolve(p.slug, small, "sm"), lg: resolve(p.slug, large, "lg") },
  ]),
);

/** Ordered list for the gallery grid — `hidden` entries (team portraits) sit this out. */
export const gallery = PHOTOS.filter((p) => !p.hidden).map((p) => photos[p.slug]);

export const galleryCategories = ["All", ...new Set(gallery.map((p) => p.category))];

/** Convenience for pages that just want one image by slug. */
export function photo(slug) {
  return photos[slug];
}
