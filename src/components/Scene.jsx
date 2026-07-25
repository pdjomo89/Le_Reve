/**
 * Decorative artwork used wherever a photograph would eventually live.
 * Pure SVG so the site is beautiful with zero network requests — drop in
 * real <img> tags later and keep the same .frame wrapper.
 */

const PALETTES = [
  { sky: ["#dcf3f1", "#a8e4e0"], sun: "#e2c894", land: ["#0e7070", "#063636"], glow: "#c09848" },
  { sky: ["#f5ecd8", "#e2c894"], sun: "#18a8a8", land: ["#0a4e4e", "#063636"], glow: "#4cc4c0" },
  { sky: ["#a8e4e0", "#128f8f"], sun: "#f5ecd8", land: ["#063636", "#0a4e4e"], glow: "#d2b06a" },
  { sky: ["#f4eee4", "#a8e4e0"], sun: "#d2b06a", land: ["#128f8f", "#063636"], glow: "#e2c894" },
];

export default function Scene({ variant = 0, className = "" }) {
  const p = PALETTES[variant % PALETTES.length];
  const uid = `scene-${variant}`;

  return (
    <svg
      className={`scene ${className}`}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`${uid}-land`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.land[0]} />
          <stop offset="100%" stopColor={p.land[1]} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="272" cy="104" r="120" fill={`url(#${uid}-glow)`} />
      <circle cx="272" cy="104" r="30" fill={p.sun} opacity="0.9" />

      {/* Distant mesa range */}
      <path
        d="M0 196 L54 168 L96 176 L138 146 L188 168 L232 152 L286 178 L340 158 L400 184 L400 300 L0 300 Z"
        fill={`url(#${uid}-land)`}
        opacity="0.35"
      />
      {/* Near butte */}
      <path
        d="M0 232 L70 206 L118 218 L176 192 L226 212 L292 196 L352 216 L400 204 L400 300 L0 300 Z"
        fill={`url(#${uid}-land)`}
      />

      {/* Saguaro silhouettes */}
      <g fill={p.land[1]} opacity="0.85">
        <path d="M60 300 v-58 a7 7 0 0 1 14 0 v58 Z" />
        <path d="M48 262 a6 6 0 0 1 12 0 v14 h-12 Z" />
        <path d="M74 250 a6 6 0 0 1 12 0 v22 h-12 Z" />
        <path d="M330 300 v-42 a6 6 0 0 1 12 0 v42 Z" />
        <path d="M320 274 a5 5 0 0 1 10 0 v10 h-10 Z" />
      </g>

      {/* Ceremony arch */}
      <g stroke={p.sun} strokeWidth="2.4" fill="none" opacity="0.95">
        <path d="M164 300 v-52 a36 36 0 0 1 72 0 v52" />
      </g>
      <g fill={p.glow} opacity="0.9">
        <circle cx="170" cy="226" r="4" />
        <circle cx="186" cy="212" r="3.2" />
        <circle cx="214" cy="211" r="3.6" />
        <circle cx="231" cy="228" r="3" />
        <circle cx="200" cy="206" r="2.6" />
      </g>
    </svg>
  );
}
