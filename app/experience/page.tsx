import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { Chapter } from "@/components/ui/Chapter";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { ReserveCTA } from "@/components/home/ReserveCTA";

export const metadata = pageMetadata({
  title: "The Experience",
  description:
    "How an evening at KAI unfolds: the philosophy, the omakase courses, the eight-seat chef's counter, seasonal fish, hospitality, and sake pairing.",
  path: "/experience",
});

const seasons = [
  { season: "Spring", fish: "Sakura masu, firefly squid, hamaguri clam" },
  { season: "Summer", fish: "Ayu, hamo, horse mackerel" },
  { season: "Autumn", fish: "Sanma, kohada, matsutake" },
  { season: "Winter", fish: "Kan-buri, snow crab, madai" },
];

export default function ExperiencePage() {
  return (
    <>
      <header className="section pb-0 pt-10 lg:pt-16">
        <div className="wrap max-w-5xl lg:mx-0 lg:ml-[max(var(--gutter),calc((100vw-var(--rail-w)-1320px)/2))]">
          <h1 className="t-display" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
            An evening, in six movements.
          </h1>
          <p className="t-lead measure mt-6 text-ash">
            KAI is built around one idea: that a meal is better when nothing competes with it. Here is how that shapes the
            room, the pace, and the plate.
          </p>
          <div className="mt-12">
            <CounterLine />
          </div>
        </div>
      </header>

      <Chapter index={0} title="The philosophy">
        <p className="t-lead">
          Attention is the one ingredient we cannot buy at the market. So we protect it: eight seats, one seating, no
          background music, and no menu to study.
        </p>
        <p>
          The pace is set by the chef, not the kitchen ticket. A piece arrives when it is ready, and it is meant to be eaten
          within moments. If you remember one thing from the evening, we would like it to be the taste of a single piece of
          fish at the right temperature.
        </p>
      </Chapter>

      <Chapter index={1} title="Omakase">
        <p className="t-lead">
          Omakase means &ldquo;I leave it to you.&rdquo; You choose the length of the evening, and the chef chooses everything else.
        </p>
        <p>
          The eighteen-course evening moves from sashimi through a warm dish and twelve pieces of nigiri, to a hand roll, a
          bowl of soup, and something sweet. The twelve-course evening keeps the same shape at a shorter length. Both are
          served at the counter.
        </p>
        <TextLink href="/menu#omakase">See the omakase menus</TextLink>
      </Chapter>

      <ExperienceTimeline showLink={false} />

      <Chapter index={2} title="The chef's counter">
        <p className="t-lead">
          Eight seats at a single length of planed hinoki, close enough to smell the cedar and the rice.
        </p>
        <p>
          Sitting at the counter means watching each piece made. You will see the cut, the press, the brush of nikiri, and
          the moment it is set down for you. Questions are welcome. So is silence.
        </p>
        <ImageReveal>
          <Photo
            src="/images/sashimi-hinoki.jpg"
            alt="Sashimi of tuna belly, sea bream and white fish arranged on a pale hinoki board over shaved daikon."
            sizes="(min-width: 1024px) 60vw, 100vw"
            aspect="3 / 2"
          />
        </ImageReveal>
      </Chapter>

      <Chapter index={3} title="Seasonal ingredients" tone="dark">
        <p className="t-lead text-washi">The menu is written after the market, not before it.</p>
        <p>These are the fish we look for, season by season. What reaches the counter depends on the week.</p>
        <dl className="border-t border-mist/40">
          {seasons.map((s) => (
            <div key={s.season} className="grid gap-1 border-b border-mist/40 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="t-label text-kin">{s.season}</dt>
              <dd className="font-serif text-xl text-washi">{s.fish}</dd>
            </div>
          ))}
        </dl>
      </Chapter>

      <Chapter index={4} title="Hospitality">
        <p className="t-lead">
          In Japanese, <span lang="ja">おもてなし</span> describes care given without being asked for.
        </p>
        <p>
          It is the warm towel, the sake cup turned so the good side faces you, the plate that changes when you finish the
          last one. Nobody at KAI will explain this to you. We would rather you simply feel it.
        </p>
        <ImageReveal>
          <Photo
            src="/images/nigiri-plate.jpg"
            alt="Two pieces of salmon nigiri and two of pale tuna on a ceramic plate with a curl of pickled ginger."
            sizes="(min-width: 1024px) 40vw, 100vw"
            aspect="4 / 5"
            className="max-w-md"
          />
        </ImageReveal>
      </Chapter>

      <Chapter index={5} title="Sake pairing">
        <p className="t-lead">Five pours, chosen to follow the fish rather than compete with it.</p>
        <p>
          Our list is short on purpose: a clean daiginjo for the first courses, a fresh namazake, a savory kimoto that is good
          warm, and a cloudy nigori for the end. Tea pairings are offered on the same pacing.
        </p>
        <p>
          <Link href="/menu#sake" className="text-link">
            See the sake list
          </Link>
        </p>
      </Chapter>

      <ReserveCTA />
    </>
  );
}
