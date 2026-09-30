import { seatNumerals } from "@/lib/site";
import { counterSeats } from "@/data/restaurant";
import { cn } from "@/lib/cn";

/**
 * The counter, drawn as the brand line: one mark per seat. Marks filled in ink
 * are the seats held for this party. Purely illustrative; assignment is ours.
 */
export function SeatPicker({ partySize, className }: { partySize: number; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative flex h-3 items-center justify-between" aria-hidden="true">
        <span className="absolute inset-x-0 top-1/2 h-px bg-hair" />
        {Array.from({ length: counterSeats }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "relative h-3 w-3 rounded-full transition-colors duration-300",
              i < partySize ? "bg-sumi" : "bg-kin-deep/60",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between" aria-hidden="true">
        {Array.from({ length: counterSeats }).map((_, i) => (
          <span key={i} className={cn("t-kanji w-3 text-center text-[0.8rem]", i < partySize ? "text-sumi" : "text-mist")}>
            {seatNumerals[i]}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-ash">
        {partySize === 1 ? "One seat" : `${partySize} seats`} of {counterSeats} at the hinoki counter, held for your party.
      </figcaption>
    </figure>
  );
}
