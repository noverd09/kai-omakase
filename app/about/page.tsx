import { pageMetadata } from "@/lib/site";
import { Chapter } from "@/components/ui/Chapter";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal } from "@/components/ui/Reveal";
import { ChefSection } from "@/components/home/ChefSection";
import { ReserveCTA } from "@/components/home/ReserveCTA";
import { CounterLine } from "@/components/ui/CounterLine";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The story of KAI: an eight-seat omakase counter built on one chef, one seating, seasonal ingredients, and quiet Japanese hospitality.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <header className="section pb-0 pt-10 lg:pt-16">
        <div className="wrap">
          <h1 className="t-display max-w-4xl" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
            Cooking for fewer people, more carefully.
          </h1>
          <div className="mt-12">
            <CounterLine />
          </div>
        </div>
      </header>

      <Chapter index={0} title="Philosophy">
        <p className="t-lead">
          KAI is small on purpose. Eight seats is the number one chef can serve without a single piece waiting.
        </p>
        <p>
          We take the name from 回, the character Japanese uses to count turns and rounds. Every evening is a sequence of
          turns: one piece, then the next, each with its full moment. We do not chase novelty. We try to make the familiar
          things slightly better than the last time.
        </p>
      </Chapter>

      <ChefSection />

      <Chapter index={2} title="Ingredients">
        <p className="t-lead">The fish decides the evening.</p>
        <p>
          Each morning the chef speaks with a handful of market wholesalers, and the menu is written from what they say is best
          that day. Some fish is served at once. Some is aged for days, because time turns firm flesh into something sweeter.
          Rice is a blend we adjust with the weather, seasoned with a red vinegar that leaves a faint warmth.
        </p>
        <ImageReveal>
          <Photo
            src="/images/sashimi-hinoki.jpg"
            alt="Tuna belly, sea bream and other sashimi laid on a hinoki board over shaved daikon."
            sizes="(min-width: 1024px) 60vw, 100vw"
            aspect="3 / 2"
          />
        </ImageReveal>
      </Chapter>

      <Chapter index={3} title="Hospitality" tone="dark">
        <p className="t-lead text-washi">Care given without being asked for.</p>
        <p>
          Our service is quiet. Water is refilled before you notice. A dish is described once, briefly, in plain words. We
          remember that you do not eat shellfish, and we remember it the next time too.
        </p>
      </Chapter>

      <Chapter index={4} title="The room">
        <p className="t-lead">Planed hinoki, warm light, and very little else.</p>
        <p>
          The counter is a single length of cypress, oiled but not lacquered, so the grain can be felt. The walls are the color
          of unbleached paper. Ceramics are chosen to suit the fish that will sit on them, which is why no two plates
          match.
        </p>
        <ImageReveal>
          <Photo
            src="/images/bowl-chopsticks.jpg"
            alt="A patterned brown ceramic bowl of squid beside wooden chopsticks on a rest, set on white paper."
            sizes="(min-width: 1024px) 50vw, 100vw"
            aspect="4 / 3"
            position="62% 40%"
          />
        </ImageReveal>
      </Chapter>

      <ReserveCTA />
    </>
  );
}
