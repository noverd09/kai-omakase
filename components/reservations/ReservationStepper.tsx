import { cn } from "@/lib/cn";

export interface StepDef {
  id: string;
  label: string;
}

/**
 * Progress along the counter: one mark per step. Completed steps are ink and
 * clickable, the current one is ringed, the rest are gold. Labels collapse to
 * the current step on small screens.
 */
export function ReservationStepper({
  steps,
  current,
  onNavigate,
}: {
  steps: StepDef[];
  current: number;
  onNavigate: (index: number) => void;
}) {
  const pct = (current / (steps.length - 1)) * 100;
  return (
    <nav aria-label="Reservation progress">
      <ol className="relative flex items-start justify-between">
        <span aria-hidden="true" className="absolute left-1.5 right-1.5 top-[0.4375rem] h-px bg-hair" />
        <span
          aria-hidden="true"
          className="absolute left-1.5 top-[0.4375rem] h-px bg-sumi transition-[width] duration-500 ease-[var(--ease-quart)]"
          style={{ width: `calc((100% - 0.75rem) * ${pct / 100})` }}
        />
        {steps.map((s, i) => {
          const done = i < current;
          const isCurrent = i === current;
          const mark = (
            <span
              aria-hidden="true"
              className={cn(
                "relative block h-3.5 w-3.5 rounded-full border transition-colors duration-300",
                done && "border-sumi bg-sumi",
                isCurrent && "border-sumi bg-washi ring-4 ring-washi",
                !done && !isCurrent && "border-kin-deep bg-kin-deep",
              )}
            />
          );
          const label = (
            <span
              className={cn(
                "t-label mt-3 hidden text-center sm:block",
                isCurrent ? "text-sumi" : "text-ash",
              )}
            >
              {s.label}
            </span>
          );
          return (
            <li key={s.id} className="flex w-3.5 flex-col items-center overflow-visible sm:w-16">
              {done ? (
                <button
                  type="button"
                  onClick={() => onNavigate(i)}
                  className="group -m-3 flex flex-col items-center p-3"
                >
                  {mark}
                  {label}
                  <span className="sr-only">Go back to {s.label}</span>
                </button>
              ) : (
                <span aria-current={isCurrent ? "step" : undefined} className="flex flex-col items-center">
                  {mark}
                  {label}
                  <span className="sr-only">
                    {s.label}
                    {isCurrent ? ", current step" : ""}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="t-label mt-4 text-ash sm:hidden" aria-hidden="true">
        Step {current + 1} of {steps.length}: {steps[current].label}
      </p>
    </nav>
  );
}
