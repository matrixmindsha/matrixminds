import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Non-intrusive Google AdSense slot.
 * - Lazy-loaded (only initializes when scrolled near viewport)
 * - Clearly labeled as "Advertisement"
 * - Sits inline in the page flow (no popups, no overlays)
 */
const AdSlot = ({
  slot = "auto",
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded.current) {
            loaded.current = true;
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
              console.warn("AdSense load error", err);
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full max-w-5xl mx-auto my-12 px-4 ${className}`}
      aria-label="Sponsored content"
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 text-center mb-2">
        {label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client="ca-pub-9086864333742571"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;
