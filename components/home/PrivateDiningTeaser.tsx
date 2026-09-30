import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const occasions = [
  { title: "Celebrations", body: "Birthdays, anniversaries, and the dinners people remember for years." },
  { title: "Corporate dinners", body: "A room that quiets a table of colleagues, with one seating and no agenda." },
  { title: "Intimate gatherings", body: "Six to twelve guests around the counter, or the whole room to yourselves." },
];

/** Type-led stone band. No card grid: three hairline rows beside the statement. */
export function PrivateDiningTeaser() {
  return (
    <section className="section bg-stone">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeading title="The room, for your evening.">
            <p>
              After hours and on Mondays, KAI opens for private dinners of six to twenty-four guests. The menu is
              composed with you, the counter is yours.
            </p>
          </SectionHeading>
          <div className="mt-10">
            <Button href="/private-dining">Plan a Private Dinner</Button>
          </div>
        </div>

        <ul className="border-t border-sumi/30 self-end">
          {occasions.map((o, i) => (
            <li key={o.title} className="border-b border-sumi/30">
              <Reveal delay={i * 0.06} className="flex items-baseline justify-between gap-6 py-7">
                <h3 className="t-h2">{o.title}</h3>
                <p className="max-w-[26ch] text-right text-sm text-ash">{o.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
