import type { ReactNode } from "react";
import { seatNumerals } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * A numbered editorial chapter: the kanji numeral and title pinned on the left,
 * the argument on the right. Used by Experience and About so both read as one ledger.
 */
export function Chapter({
  index,
  title,
  children,
  id,
  tone = "light",
}: {
  index: number;
  title: string;
  children: ReactNode;
  id?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("section", dark ? "on-ink bg-sumi text-washi" : "")}>
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className={cn("t-kanji text-3xl", dark ? "text-kin" : "text-tokiwa")} aria-hidden="true">
            {seatNumerals[index]}
          </p>
          <h2 className="t-h1 mt-3">{title}</h2>
        </div>
        <Reveal className={cn("space-y-6", dark ? "text-stone" : "text-ash")}>{children}</Reveal>
      </div>
    </section>
  );
}
