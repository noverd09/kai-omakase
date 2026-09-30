"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { counterSeats } from "@/data/restaurant";
import { seatNumerals } from "@/lib/site";

/**
 * The brand device: the counter as a hairline with one mark per seat.
 * Decorative here. The interactive version lives in the reservation flow.
 */
export function CounterLine({
  tone = "light",
  seats = counterSeats,
  className,
  labeled = false,
}: {
  tone?: "light" | "dark";
  seats?: number;
  className?: string;
  /** Show the formal kanji numeral under each seat mark. */
  labeled?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={className}>
    <div className="relative flex h-3 items-center justify-between">
      <motion.span
        className={cn("absolute inset-x-0 top-1/2 h-px origin-left", dark ? "bg-mist/40" : "bg-hair")}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      />
      {Array.from({ length: seats }).map((_, i) => (
        <motion.span
          key={i}
          className={cn("relative h-3 w-3 rounded-full", dark ? "bg-kin" : "bg-kin-deep")}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.09, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
    </div>
    {labeled ? (
      <div className="mt-3 flex justify-between">
        {Array.from({ length: seats }).map((_, i) => (
          <span key={i} className={cn("t-kanji w-3 text-center text-[0.8rem]", dark ? "text-mist" : "text-ash")}>
            {seatNumerals[i]}
          </span>
        ))}
      </div>
    ) : null}
    </div>
  );
}
