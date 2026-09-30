import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Hanging section head (S1): a heading, and optionally one supporting line.
 * No eyebrow by default. Pass `kicker` sparingly, at most once or twice a page.
 */
export function SectionHeading({
  title,
  kicker,
  children,
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  title: ReactNode;
  kicker?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker ? (
        <p className={cn("t-label mb-5", tone === "dark" ? "text-kin" : "text-kin-deep")}>{kicker}</p>
      ) : null}
      <Tag className="t-h1">{title}</Tag>
      {children ? (
        <div className={cn("t-lead measure mt-6", tone === "dark" ? "text-mist" : "text-ash")}>{children}</div>
      ) : null}
    </div>
  );
}
