import logoDark from "../assets/logo.webp";
import logoLight from "../assets/logo-light.webp";

/**
 * The Le Rêve wreath mark.
 *
 * The artwork ships in two versions because it sits on both ivory and deep
 * turquoise: `logo.webp` is the original colourway for ivory surfaces, and
 * `logo-light.webp` is the same art with its saturation pushed so the aqua
 * script and gold wreath separate hard from the dark nav, headers and footer.
 *
 * The mark already contains the wordmark and "Wedding Planner", so no extra
 * type is set beside it.
 */
export default function Logo({ variant = "dark", size = "md", className = "" }) {
  return (
    <img
      src={variant === "light" ? logoLight : logoDark}
      alt="Le Rêve — Wedding Planner"
      className={`logo logo--${size} ${className}`}
      width="322"
      height="303"
      decoding="async"
    />
  );
}
