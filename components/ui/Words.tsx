"use client";

import { useEffect, useRef, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Headline text whose words rise out of a mask.
 *
 * Two modes, both visible by default so text never depends on JavaScript:
 *  - "load"   above the fold: pure CSS animation, runs as the page paints.
 *  - "scroll" below the fold: the words start hidden only after JS confirms the
 *             heading is off-screen, and rise when it scrolls into view.
 * Screen readers get one continuous sentence: the split spans are separated by
 * real spaces, and the visual mask is presentational only.
 */
export function Words({
  text,
  as,
  mode = "scroll",
  delay = 0,
  className,
}: {
  text: string;
  as?: ElementType;
  mode?: "load" | "scroll";
  delay?: number;
  className?: string;
}) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mode !== "scroll") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  }, [mode]);

  const words = text.split(" ");
  return (
    <Tag
      ref={ref}
      className={cn("words", mode === "load" && "words-load", className)}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="word">
            <span className="word-in" style={{ "--i": i } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
