import { Reveal, ImageReveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

/** Editorial two-column story. The photograph is offset so the page never sits on one axis. */
export function Story() {
  return (
    <section className="section">
      <div className="wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:col-start-1 lg:pt-16">
          <SectionHeading title="Fewer seats, more attention.">
            <p>
              KAI began with a simple arithmetic. A counter of eight can be watched by one chef, and served by one
              pair of hands, without anything reaching the plate late.
            </p>
          </SectionHeading>
          <Reveal className="mt-8">
            <p className="measure text-ash">
              The character 回 is used in Japanese to count turns and rounds. We took it for the name because that is how
              the evening runs: one course, then the next, each given its full moment before it is gone.
            </p>
            <p className="measure mt-5 text-ash">
              The room is quiet by design. Ceramics are chosen for the fish, the counter is planed hinoki that smells of
              cedar when you sit down, and the only music is the knife.
            </p>
            <div className="mt-6">
              <TextLink href="/about">Read our story</TextLink>
            </div>
          </Reveal>
        </div>

        <ImageReveal className="lg:col-span-6 lg:col-start-7">
          <figure>
            <Photo
              src="/images/bowl-chopsticks.jpg"
              alt="A brown ceramic bowl with maple-leaf and blossom patterns holds a small squid dish, beside pale wood chopsticks on a rest."
              sizes="(min-width: 1024px) 46vw, 100vw"
              aspect="4 / 5"
              position="62% 30%"
            />
            <figcaption className="t-label mt-4 text-ash">Ceramics, chosen for the fish</figcaption>
          </figure>
        </ImageReveal>
      </div>
    </section>
  );
}
