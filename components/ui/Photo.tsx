import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The one place photography is rendered. Swapping final photography in later
 * means changing `src` in `data/`, nothing else. The stone background shows
 * while an image loads and is the honest fallback if one is missing.
 */
export function Photo({
  src,
  alt,
  sizes,
  aspect = "4 / 5",
  position = "center",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  aspect?: string;
  position?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-[2px] bg-stone", className)}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
