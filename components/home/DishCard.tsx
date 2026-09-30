import { menuCategories } from "@/data/menu";
import type { MenuItemRow } from "@/types/database";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** A featured dish: photograph, category, name, one line. Not a boxed card. */
export function DishCard({
  item,
  aspect = "4 / 5",
  sizes,
  className,
}: {
  item: MenuItemRow;
  aspect?: string;
  sizes: string;
  className?: string;
}) {
  const category = menuCategories.find((c) => c.id === item.category)?.label ?? item.category;
  return (
    <figure className={cn("group", className)}>
      {item.image ? (
        <ImageReveal>
          <Photo
            src={item.image}
            alt={`${item.name}. ${item.description.replace(/ · /g, ", ")}.`}
            sizes={sizes}
            aspect={aspect}
            className="[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-[var(--ease-quart)] group-hover:[&_img]:scale-[1.03]"
          />
        </ImageReveal>
      ) : null}
      <figcaption className="mt-5">
        <p className="t-label text-kin-deep">{category}</p>
        <p className="t-h3 mt-2">{item.name}</p>
        <p className="mt-1 text-sm text-ash">{item.description}</p>
      </figcaption>
    </figure>
  );
}
