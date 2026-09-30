import { Reveal, ImageReveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export const experienceSteps = [
  {
    n: "01",
    title: "Arrival",
    body: "Doors open at 5:30. You are greeted by name, handed a warm towel, and shown to your seat at the counter.",
  },
  {
    n: "02",
    title: "Chef's Selection",
    body: "Ren describes the evening's fish in a few sentences. There is no menu to read. You only need to mention allergies.",
  },
  {
    n: "03",
    title: "Seasonal Course",
    body: "Sashimi, a warm dish, then nigiri one piece at a time, placed in front of you the moment it is ready.",
  },
  {
    n: "04",
    title: "Dessert & Sake",
    body: "The evening softens: tamago, something cold and citrus, and a last pour of sake or roasted tea.",
  },
] as const;

/** F4 numbered sequence on ink. Each step hangs from the counter line by a seat mark. */
export function ExperienceTimeline({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="on-ink section bg-sumi text-washi">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading title="The Experience" tone="dark">
            <p>Four movements across roughly two hours, at one counter, with one chef.</p>
          </SectionHeading>
          {showLink ? (
            <TextLink href="/experience" className="text-washi">
              Explore the Experience
            </TextLink>
          ) : null}
        </div>

        <ImageReveal className="mt-14">
          <Photo
            src="/images/counter-chef.jpg"
            alt="A sushi chef in a white uniform and paper hat looks over the glass counter, with trays of tuna and mackerel below."
            sizes="(min-width: 1024px) calc(100vw - 88px - 80px), 100vw"
            aspect="21 / 9"
            position="50% 40%"
            className="!aspect-[4/3] sm:!aspect-[21/9]"
          />
        </ImageReveal>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {experienceSteps.map((s, i) => (
            <li key={s.n} className="relative border-t border-mist/40 pt-8">
              <span className="absolute -top-1.5 left-0 h-3 w-3 rounded-full bg-kin" aria-hidden="true" />
              <Reveal delay={i * 0.08}>
                <p className="t-num text-sm text-kin">{s.n}</p>
                <h3 className="t-h2 mt-3">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
