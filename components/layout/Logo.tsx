import { cn } from "@/lib/cn";

/** Wordmark: KAI in tracked light serif, with the 回 mark. */
export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-3", className)}>
      <span className="font-serif text-[1.65rem] font-light leading-none tracking-[0.32em]">KAI</span>
      {mark ? (
        <span className="t-kanji text-[1.1rem]" aria-hidden="true">
          回
        </span>
      ) : null}
    </span>
  );
}
