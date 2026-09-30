import Image from "next/image";
import { Button, TextLink } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";

/** H1 statement fold: the headline is the visual, one photograph answers it. */
export function Hero() {
  return (
    <section className="grid min-h-[calc(100svh-4rem)] lg:min-h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="flex flex-col justify-between gap-14 px-[var(--gutter)] pb-10 pt-10 lg:py-14 lg:pr-14">
        <p className="t-label rise-in text-ash">Japanese Omakase · Eight seats</p>

        <div>
          <h1 className="t-display rise-in" style={{ animationDelay: "0.1s" }}>
            An Evening of Japanese Craft
          </h1>
          <p className="t-lead measure rise-in mt-8 text-ash" style={{ animationDelay: "0.25s" }}>
            KAI seats eight guests at a single hinoki counter, once each evening. The chef builds the menu from the
            morning&rsquo;s market and serves it course by course, an arm&rsquo;s length away.
          </p>
          <div
            className="rise-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-2"
            style={{ animationDelay: "0.4s" }}
          >
            <Button href="/reservations">Reserve a Table</Button>
            <TextLink href="/experience">Explore the Experience</TextLink>
          </div>
        </div>

        <div>
          <CounterLine />
          <p className="t-label mt-4 text-ash">One seating · Tuesday to Sunday · 5:30 PM</p>
        </div>
      </div>

      <figure className="wipe-in relative min-h-[56svh] bg-stone lg:min-h-0">
        <Image
          src="/images/plate-awabi.jpg"
          alt="Steamed abalone with gold leaf and a yellow chrysanthemum on a green ceramic plate, beside a small dish of soy."
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "38% 50%" }}
        />
        <figcaption className="t-label absolute bottom-0 left-0 bg-sumi px-4 py-3 text-mist">
          Awabi · gold leaf · the chef&rsquo;s selection
        </figcaption>
      </figure>
    </section>
  );
}
