# Le Rêve — Arizona Wedding Planning

A React + Vite marketing site for a statewide Arizona wedding planning studio.
Theme: **turquoise + antique gold** on warm ivory.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run lint
```

## Routes

| Path           | Page                                                          |
| -------------- | ------------------------------------------------------------- |
| `/`            | Home — hero, studio intro, stats, services, process, testimonials, regions, journal preview |
| `/services`    | All six packages with pricing and inclusions, process, FAQ accordion |
| `/about`       | Studio story, values, team, recent-work strip, contact details |
| `/gallery`     | Filterable masonry gallery with a keyboard-driven lightbox      |
| `/news`        | Journal index with category filter + live search               |
| `/news/:slug`  | Article page with related posts                                |
| `/consultation`| Three-step enquiry form with validation and success state      |
| `*`            | 404                                                            |

Routing uses `createBrowserRouter` with a shared `Layout` (nav + footer + scroll
restoration, including smooth scroll to `#hash` anchors so footer links like
`/services#full-planning` land correctly).

## Structure

```
src/
  main.jsx            router definition
  index.css           design tokens + global primitives (buttons, cards, forms)
  styles/app.css      component styles
  assets/             generated logo variants (see "The logo" below)
  data/site.js        ALL content — services, journal posts, team, FAQs, brand
  lib/format.js       date formatting
  components/         Layout, Navbar, Footer, Logo, Scene, Reveal, PageHeader, CTABand
  pages/              Home, Services, About, News, Article, Consultation, NotFound
```

## Photography

22 photos live in `src/assets/photos/` as two WebP sizes each — `<slug>-sm.webp`
(640w, cards and grid) and `<slug>-lg.webp` (1300w, lightbox and full-bleed).
`src/data/photos.js` picks them up with `import.meta.glob`, so **adding a photo
means dropping in the two files and adding one row to the `PHOTOS` array** — there
is no import list to maintain.

Render them through `<Photo slug="..." />` rather than a bare `<img>`. It wraps the
image in the standard `.frame`, so the turquoise/gold gradient sits underneath and
a slow or failed image degrades to brand colour instead of a broken-image icon, and
it fades each one in as it lazy-loads.

The gallery reads the same array: categories are derived from the data, the grid is
CSS `column-count` masonry (no JS measurement), and the lightbox supports arrow keys
and Escape.

> **All photography is placeholder.** See `brand/CREDITS.md` for sources and
> licensing. The captions and Arizona locations in `src/data/photos.js` are invented
> for layout and do not describe the real photos — replace both before launch.
>
> ⚠️ The four **team portraits** need replacing before launch specifically. They
> are identifiable real people with no connection to the studio, presented on the
> page as named staff — fine as a layout placeholder, not fine on a live business
> site. `brand/CREDITS.md` has the swap instructions.

Each inner page also gets a photo banner via `<PageHeader photo="slug" />`; omit
the prop and it falls back to the turquoise/gold gradient.

## The logo

The supplied artwork is a raster wreath on white paper, kept at
`brand/logo-source.png`. `brand/make-assets.py` (needs Pillow) derives every web
asset from it and can be re-run if the source is ever updated:

```bash
python3 brand/make-assets.py
```

It produces:

| Output | Used for |
| --- | --- |
| `src/assets/logo.webp` | original colourway, white keyed out — light surfaces |
| `src/assets/logo-light.webp` | same art lifted toward white — deep turquoise surfaces |
| `public/favicon.png` | 64px browser tab icon |
| `public/apple-touch-icon.png` | 180px home-screen icon on ivory |

The white background is removed by unmultiplying against white (a pixel's alpha
is its distance from white, and the colour divides the blended white back out),
which keeps the antialiasing on the script and the fine gold linework intact
rather than hard-keying it into jagged edges.

Where it appears: full size in the home hero, in the nav (fading in on scroll —
the home hero already shows it, so the nav copy stays hidden until the bar
solidifies), in the footer, and as a faint oversized seal behind every CTA band.

**The palette is derived from the logo.** The `--turquoise-500` and `--gold-500`
tokens in `src/index.css` are the sampled script (`#18a8a8`) and wreath
(`#c09848`) colours, with each ramp built around them, so the mark never sits at
odds with the interface around it.

## Notes for the next pass

- **Content lives in one file.** `src/data/site.js` holds every service, article,
  team member and FAQ. Swap it for a CMS fetch without touching a component.
- **The hero photo is a licensed placeholder.** It's an Unsplash shot by Allison
  Heine (see `brand/CREDITS.md` for licence and the unmodified master). Swap it
  for a photo from a real Le Rêve wedding before launch — a planner's hero should
  be their own portfolio. Regenerate the three responsive sizes from any new
  master and keep the subject in the right half of the frame, clear of the text.
- **Everything else is SVG, not photography.** `components/Scene.jsx` draws a stylized
  desert scene in the brand palette so the site is complete with zero external
  requests. Replace each `<Scene />` with an `<img>` inside the same `.frame`
  wrapper when real photos arrive — the gradient underlay already covers load-in.
- **The consultation form does not submit anywhere.** `onSubmit` in
  `pages/Consultation.jsx` validates and shows the success state; the `POST` to a
  booking service goes at the marked line.
- **Deploying to a static host** needs an SPA rewrite (all paths → `index.html`),
  otherwise a hard refresh on `/services` 404s.
- Fonts (Cormorant Garamond + Jost) load from Google Fonts in `index.html`, with
  system serif/sans fallbacks in the token file.
