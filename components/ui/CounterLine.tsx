"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { counterSeats } from "@/data/restaurant";

/**
 * The brand device: the counter as a hairline with one mark per seat.
 * Decorative here. The interactive version lives in the reservation flow.
 */
export function CounterLine({
  tone = "light",
  seats = counterSeats,
  className,
}: {
  tone?: "light" | "dark";
  seats?: number;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={cn("relative flex h-3 items-center justify-between", className)}>
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
  );
}
