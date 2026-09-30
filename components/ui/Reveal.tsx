"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll reveals, built so that content is visible unless JavaScript has both
 * loaded and decided the element is below the fold. That keeps three cases correct:
 *  - no JS / slow JS: everything is readable,
 *  - prefers-reduced-motion: nothing is ever hidden (see globals.css),
 *  - server and first client render are identical, so there is no hydration mismatch.
 * State lives in `data-armed` / `data-shown` attributes, driven from an effect.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen (or above it): leave it visible instead of flashing it hidden.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.armed = "true";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Fade and rise on first view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

/**
 * Slides a photograph in like a panel: a clip-path wipe.
 * The observed element is the OUTER wrapper and the clipped element is the inner one,
 * because a browser treats an element clipped away by its own clip-path as not
 * intersecting, so observing the clipped node would never fire.
 */
export function ImageReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal-wipe", className)} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      <div className="reveal-wipe-inner">{children}</div>
    </div>
  );
}
