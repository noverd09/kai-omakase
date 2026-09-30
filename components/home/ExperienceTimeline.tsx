"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const experienceSteps = [
  {
    n: "01",
    title: "Arrival",
    body: "Doors open at 5:30. You are greeted by name, handed a warm towel, and shown to your seat at the counter.",
    image: "/images/room-counter.jpg",
    alt: "A long pale hinoki counter set for service, with lacquer trays, green ceramic plates and tall windows onto a garden.",
    position: "40% 50%",
  },
  {
    n: "02",
    title: "Chef's Selection",
    body: "Ren describes the evening's fish in a few sentences. There is no menu to read. You only need to mention allergies.",
    image: "/images/counter-chef.jpg",
    alt: "A sushi chef in a white uniform and paper hat looks across the glass counter, with trays of tuna and mackerel below.",
    position: "55% 40%",
  },
  {
    n: "03",
    title: "Seasonal Course",
    body: "Sashimi, a warm dish, then nigiri one piece at a time, placed in front of you the moment it is ready.",
    image: "/images/kaiseki-spread.jpg",
    alt: "A spread of small Japanese dishes seen from above: sashimi, rice, grilled sweetfish, tofu and pickles on lacquer and ceramic.",
    position: "50% 40%",
  },
  {
    n: "04",
    title: "Dessert & Sake",
    body: "The evening softens: tamago, something cold and citrus, and a last pour of sake or roasted tea.",
    image: "/images/dessert-wagashi.jpg",
    alt: "Three hand-shaped wagashi sweets, a green leaf, a pink flower and a peony, on a pale wooden board.",
    position: "35% 55%",
  },
] as const;

/**
 * F3 sticky story on ink. From 1024px up, one photograph is pinned and crossfades
 * as each movement passes the middle of the screen. Below that, every movement
 * carries its own photograph, so the same content reads as a simple stack.
 */
export function ExperienceTimeline({ showLink = true }: { showLink?: boolean }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // overflow-x-clip, not overflow-hidden: hidden would make this section the sticky
  // photograph's scroll container, and it would stop pinning.
  return (
    <section className="on-ink section relative overflow-x-clip bg-sumi text-washi">
      <span aria-hidden="true" data-glyph="回" className="watermark -right-[6vw] top-[6%] text-[clamp(18rem,44vw,40rem)] text-washi" />

      <div className="wrap relative">
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

        <div className="mt-16 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          {/* Pinned photograph, desktop only. */}
          <div className="hidden lg:block">
            <div className="sticky top-[9vh] h-[82vh] max-h-[860px]">
              <div className="crop-marks relative h-full overflow-hidden bg-sumi-2">
                {experienceSteps.map((s, i) => (
                  <Image
                    key={s.n}
                    src={s.image}
                    alt={i === active ? s.alt : ""}
                    aria-hidden={i === active ? undefined : true}
                    fill
                    sizes="42vw"
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-quart)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                    style={{ objectPosition: s.position }}
                  />
                ))}
                <p className="t-num absolute bottom-0 left-0 bg-sumi px-5 py-3 font-serif text-3xl font-light leading-none text-kin">
                  {experienceSteps[active].n}
                  <span className="ml-3 text-base text-mist">/ 04</span>
                </p>
              </div>
              {/* Progress along the counter: one mark per movement. */}
              <div aria-hidden="true" className="absolute -left-8 top-0 flex h-full flex-col items-center justify-between py-2">
                <span className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-mist/30" />
                {experienceSteps.map((s, i) => (
                  <span
                    key={s.n}
                    className={cn(
                      "relative h-3 w-3 rounded-full transition-colors duration-500",
                      i <= active ? "bg-kin" : "bg-mist/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol>
            {experienceSteps.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-i={i}
                className="border-t border-mist/30 py-12 first:border-t-0 first:pt-0 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
              >
                <div className="lg:hidden">
                  <Photo src={s.image} alt={s.alt} sizes="(min-width: 640px) 90vw, 100vw" aspect="4 / 3" position={s.position} />
                </div>
                <Reveal
                  className={cn(
                    "mt-8 lg:mt-0 lg:transition-opacity lg:duration-700",
                    i === active ? "lg:opacity-100" : "lg:opacity-60",
                  )}
                >
                  <p className="t-num text-sm text-kin">{s.n}</p>
                  <h3 className="t-h1 mt-3">{s.title}</h3>
                  <p className="t-lead mt-5 max-w-[44ch] text-stone">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
