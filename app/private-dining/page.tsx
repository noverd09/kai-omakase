import { pageMetadata } from "@/lib/site";
import { Words } from "@/components/ui/Words";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { CounterLine } from "@/components/ui/CounterLine";
import { PrivateDiningForm } from "@/components/forms/PrivateDiningForm";

export const metadata = pageMetadata({
  title: "Private Dining",
  description:
    "Private dinners at KAI for six to twenty-four guests: celebrations, corporate dinners, and intimate gatherings, with a menu composed for your evening.",
  path: "/private-dining",
});

const events = [
  { title: "Celebrations", body: "Birthdays, anniversaries, engagements. A dinner people talk about afterwards." },
  { title: "Corporate dinners", body: "A quiet room for a table of colleagues or clients. One seating, no agenda, no screens." },
  { title: "Intimate gatherings", body: "Friends and family around the counter, or the whole room to yourselves." },
];

const options = [
  { label: "Counter buyout", detail: "All eight seats and the chef, for up to eight guests.", capacity: "Up to 8" },
  { label: "Counter and table", detail: "The counter plus the table behind it, served as one evening.", capacity: "Up to 14" },
  { label: "Full room", detail: "The entire restaurant, with a menu composed with you.", capacity: "Up to 24" },
];

export default function PrivateDiningPage() {
  return (
    <>
      <header className="section pb-[calc(var(--section-y)*0.6)] pt-10 lg:pt-16">
        <div className="wrap">
          <h1 className="t-display max-w-4xl" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
            <Words text="The room, for your evening." mode="load" />
          </h1>
          <p className="t-lead measure mt-6 text-ash">
            On Mondays and after the regular seating, KAI opens for private dinners of six to twenty-four guests. We compose the
            menu with you, and the counter is yours.
          </p>
          <div className="mt-12">
            <CounterLine />
          </div>
        </div>
      </header>

      <section className="section pt-0">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h2 className="t-h1 lg:sticky lg:top-24 lg:self-start">Who it&rsquo;s for</h2>
          <ul className="border-t border-hair">
            {events.map((e, i) => (
              <li key={e.title} className="border-b border-hair">
                <Reveal delay={i * 0.06} className="py-8">
                  <h3 className="t-h2">{e.title}</h3>
                  <p className="measure mt-2 text-ash">{e.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="t-h1">Capacity and options</h2>
          <dl className="mt-12 grid gap-px bg-sumi/25 md:grid-cols-3">
            {options.map((o) => (
              <div key={o.label} className="bg-stone p-8 first:pl-0 md:first:pl-0 md:pl-8">
                <dt className="t-label text-tokiwa">{o.capacity}</dt>
                <dd>
                  <span className="t-h2 mt-3 block">{o.label}</span>
                  <span className="mt-2 block text-sm text-ash">{o.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-prose text-sm text-ash">
            Menus start at the twelve-course omakase and grow from there. A sake or tea pairing can be added. Details are settled
            once we have spoken.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title" className="t-h1">
            The room
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-12">
            <ImageReveal className="sm:col-span-7">
              <Photo
                src="/images/room-counter.jpg"
                alt="A long pale hinoki counter set for service, with lacquer trays, green ceramic plates and tall windows onto a garden."
                sizes="(min-width: 640px) 58vw, 100vw"
                aspect="16 / 10"
                position="40% 50%"
              />
            </ImageReveal>
            <ImageReveal delay={0.1} className="sm:col-span-5 sm:mt-16">
              <Photo
                src="/images/counter-chef.jpg"
                alt="A sushi chef in a white uniform and paper hat looks across the glass counter, with trays of tuna and mackerel below."
                sizes="(min-width: 640px) 40vw, 100vw"
                aspect="4 / 5"
                position="55% 40%"
              />
            </ImageReveal>
          </div>
          <p className="mt-4 text-xs text-ash">Stand-in photography. Final images of the room replace these before launch.</p>
        </div>
      </section>

      <section id="inquiry" className="on-stone section bg-stone pt-[calc(var(--section-y)*0.8)]">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div>
            <h2 className="t-h1">Plan a private dinner</h2>
            <p className="measure mt-5 text-ash">
              Tell us about the evening. We reply within two business days with availability and a proposed menu.
            </p>
          </div>
          <PrivateDiningForm />
        </div>
      </section>
    </>
  );
}
