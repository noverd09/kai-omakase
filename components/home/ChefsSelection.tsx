import { featuredItems } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { DishCard } from "./DishCard";

/** Four dishes, set on an irregular grid so the rhythm is composed, not repeated. */
export function ChefsSelection() {
  const pick = (id: string) => featuredItems.find((i) => i.id === id)!;
  // Aspect ratios follow each photograph's own shape: portrait, landscape, tall crop, wide.
  const a = pick("sushi-akami");
  const b = pick("sushi-salmon");
  const c = pick("plate-ika");
  const d = pick("sashimi-board");
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading title="From the chef's selection" />
          <TextLink href="/menu">View the full menu</TextLink>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <DishCard item={a} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 100vw" className="lg:col-span-4" aspect="4 / 5" />
          <DishCard item={b} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 100vw" className="lg:col-span-5 lg:mt-24" aspect="5 / 4" />
          <DishCard item={c} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw" className="lg:col-span-3 lg:mt-10" aspect="3 / 4" />
          <DishCard item={d} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 100vw" className="lg:col-span-5 lg:col-start-4 lg:-mt-6" aspect="16 / 10" />
        </div>
      </div>
    </section>
  );
}
