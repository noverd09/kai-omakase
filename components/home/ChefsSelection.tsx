import { featuredItems } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DishCard } from "./DishCard";

/** Three dishes on an irregular grid, with a quiet note in the gap where a fourth card would repeat the rhythm. */
export function ChefsSelection() {
  const pick = (id: string) => featuredItems.find((i) => i.id === id)!;
  // Aspect ratios follow each photograph's own shape: portrait, landscape, wide.
  const tuna = pick("sushi-akami");
  const salmon = pick("sushi-salmon");
  const board = pick("sashimi-board");
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading title="From the chef's selection" />
          <TextLink href="/menu">View the full menu</TextLink>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <DishCard item={tuna} sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw" className="lg:col-span-5" aspect="4 / 5" />
          <DishCard item={salmon} sizes="(min-width: 1024px) 46vw, (min-width: 768px) 45vw, 100vw" className="lg:col-span-6 lg:col-start-7 lg:mt-28" aspect="5 / 4" />
          <DishCard item={board} sizes="(min-width: 1024px) 56vw, (min-width: 768px) 90vw, 100vw" className="md:col-span-2 lg:col-span-7 lg:col-start-2" aspect="16 / 10" />
          <Reveal className="self-end md:col-span-2 lg:col-span-3 lg:col-start-10">
            <p className="t-label text-kin-deep">Today at the counter</p>
            <p className="t-quote mt-4">The board changes with the market. Ask for it when you sit down.</p>
            <p className="mt-4 max-w-[34ch] text-sm text-ash">Cut to order, aged where the fish asks for it, served on hinoki.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
