import { pageMetadata } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { OmakaseIntro } from "@/components/home/OmakaseIntro";
import { ChefsSelection } from "@/components/home/ChefsSelection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { Story } from "@/components/home/Story";
import { ChefSection } from "@/components/home/ChefSection";
import { PrivateDiningTeaser } from "@/components/home/PrivateDiningTeaser";
import { ReserveCTA } from "@/components/home/ReserveCTA";

export const metadata = pageMetadata({
  title: "Japanese Omakase",
  description:
    "An eight-seat Japanese omakase counter with one seating each evening. Seasonal fish, chef-led courses, quiet hospitality. Reserve a table at KAI.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <OmakaseIntro />
      <ChefsSelection />
      <ExperienceTimeline />
      <Story />
      <ChefSection />
      <PrivateDiningTeaser />
      <ReserveCTA />
    </>
  );
}
