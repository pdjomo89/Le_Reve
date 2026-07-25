import { useEffect, useRef, useState } from "react";
import { photo as lookup } from "../data/photos.js";

/**
 * A photo inside the standard `.frame` wrapper.
 *
 * The frame keeps its turquoise/gold gradient underneath, so a slow or failed
 * image degrades to brand colour rather than a broken-image box. Images fade in
 * on load to avoid the hard pop you get with lazy loading down a long page.
 */
export default function Photo({
  slug,
  size = "sm",
  className = "",
  ratio,
  zoom = false,
  priority = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const item = lookup(slug);

  // A cached image can finish loading before React attaches onLoad, which would
  // leave it stuck at opacity 0 — catch that case on mount.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  if (!item) return <div className={`frame ${className}`} />;

  return (
    <div
      className={`frame${zoom ? " frame--zoom" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        ref={imgRef}
        src={size === "lg" ? item.lg : item.sm}
        alt={item.alt}
        className={`photo${loaded ? " is-loaded" : ""}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
      {children}
    </div>
  );
}
