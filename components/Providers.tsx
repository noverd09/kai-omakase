"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Motion honour the OS setting itself: transform and
 * layout animations are skipped for users who ask for less motion. Components
 * must therefore NOT branch their initial props on `useReducedMotion`, which would
 * make server and client markup differ.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
