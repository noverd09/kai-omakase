import { cn } from "@/lib/cn";

const fish: [string, string][] = [
  ["Sakura masu", "桜鱒"],
  ["Hotaru ika", "蛍烏賊"],
  ["Hamaguri", "蛤"],
  ["Ayu", "鮎"],
  ["Sanma", "秋刀魚"],
  ["Kohada", "小肌"],
  ["Kan-buri", "寒鰤"],
  ["Madai", "真鯛"],
  ["Uni", "雲丹"],
  ["Awabi", "鮑"],
];

function Run({ dup }: { dup?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" {...(dup ? { "data-dup": "", "aria-hidden": true } : {})}>
      {fish.map(([en, jp]) => (
        <li key={en} className="flex items-center whitespace-nowrap">
          <span className="font-serif text-[clamp(1.5rem,3.4vw,2.5rem)] font-light">{en}</span>
          <span lang="ja" className="t-kanji ml-4 text-[clamp(1.1rem,2.4vw,1.75rem)] text-tokiwa">
            {jp}
          </span>
          <span aria-hidden="true" className={cn("mx-8 h-2 w-2 shrink-0 rounded-full bg-kin-deep")} />
        </li>
      ))}
    </ul>
  );
}

/** A slow band of what the market brings. Motion pauses on hover and stops under reduced motion. */
export function SeasonTicker() {
  return (
    <section aria-label="Fish we look for through the seasons" className="ticker overflow-hidden border-y border-hair py-7">
      <div className="ticker-track">
        <Run />
        <Run dup />
      </div>
    </section>
  );
}
