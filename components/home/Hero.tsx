import Image from "next/image";
import { Button, TextLink } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";
import { Words } from "@/components/ui/Words";

/** H1 statement fold: the headline is the visual, one photograph answers it. */
export function Hero() {
  return (
    <section className="hero grid min-h-[calc(100svh-4rem)] lg:min-h-svh lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="flex flex-col justify-between gap-14 px-[var(--gutter)] pb-10 pt-10 lg:py-14 lg:pr-14">
        <p className="t-label rise-in text-ash">Japanese Omakase · Eight seats</p>

        <div>
          <h1 className="t-display">
            <Words text="An Evening of Japanese Craft" mode="load" />
          </h1>
          <p className="t-lead measure rise-in mt-8 text-ash" style={{ animationDelay: "0.7s" }}>
            KAI seats eight guests at a single hinoki counter, once each evening. The chef builds the menu from the
            morning&rsquo;s market and serves it course by course, an arm&rsquo;s length away.
          </p>
          <div
            className="rise-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-2"
            style={{ animationDelay: "0.9s" }}
          >
            <Button href="/reservations">Reserve a Table</Button>
            <TextLink href="/experience">Explore the Experience</TextLink>
          </div>
        </div>

        <div className="rise-in" style={{ animationDelay: "1.1s" }}>
          <CounterLine />
          <p className="t-label mt-4 text-ash">One seating · Tuesday to Sunday · 5:30 PM</p>
        </div>
      </div>

      <figure className="wipe-in crop-marks relative min-h-[56svh] overflow-hidden bg-stone lg:min-h-0">
        <div className="hero-drift absolute inset-x-0 -inset-y-[6%]">
          <Image
            src="/images/plate-awabi.jpg"
            alt="Steamed abalone with gold leaf and a yellow chrysanthemum on a green ceramic plate, beside a small dish of soy."
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="settle object-cover"
            style={{ objectPosition: "38% 50%" }}
          />
        </div>
        {/* Ichigo ichie: "one time, one meeting". Decorative; the meaning is carried by the caption. */}
        <p
          lang="ja"
          aria-hidden="true"
          className="t-kanji rise-in absolute right-5 top-6 hidden text-2xl tracking-[0.35em] text-washi [text-shadow:0_1px_12px_rgb(0_0_0/0.45)] [writing-mode:vertical-rl] sm:block"
          style={{ animationDelay: "1.6s" }}
        >
          一期一会
        </p>
        <figcaption className="t-label absolute bottom-0 left-0 bg-sumi px-4 py-3 text-mist">
          Fig. 01 · Awabi, gold leaf · the chef&rsquo;s selection
        </figcaption>
      </figure>
    </section>
  );
}
