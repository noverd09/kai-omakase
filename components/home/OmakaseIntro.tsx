import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seatNumerals } from "@/lib/site";

const principles = [
  {
    title: "Seasonal ingredients",
    body: "Our fish arrives from the market each morning, and the menu is written after it does. What is best this week, and only that.",
  },
  {
    title: "The chef's selection",
    body: "There is no menu to read and nothing to decide. Tell us what you cannot eat, and the rest is left to the chef.",
  },
  {
    title: "Fresh preparation",
    body: "Each piece is cut, pressed, and set in front of you within seconds. Rice at body temperature, fish at its own.",
  },
  {
    title: "Japanese craftsmanship",
    body: "Knife work, aging, and rice are years of repetition. We keep the technique traditional and the plate uncluttered.",
  },
];

/** Split diptych: a pinned statement on the left, the argument scrolling on the right. */
export function OmakaseIntro() {
  return (
    <section className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading title="Omakase means, “I leave it to you.”">
            <p>お任せ. It is an act of trust between guest and chef, and the reason the evening feels unhurried.</p>
          </SectionHeading>
        </div>

        <ol className="border-t border-hair">
          {principles.map((p, i) => (
            <li key={p.title} className="border-b border-hair">
              <Reveal delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 py-8 sm:grid-cols-[3.5rem_1fr] sm:py-10">
                <span className="t-kanji pt-1 text-2xl text-tokiwa" aria-hidden="true">
                  {seatNumerals[i]}
                </span>
                <div>
                  <h3 className="t-h2">{p.title}</h3>
                  <p className="measure mt-3 text-ash">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
