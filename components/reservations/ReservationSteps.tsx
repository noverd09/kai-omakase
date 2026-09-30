"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import { SeatPicker } from "./SeatPicker";
import { BOOKING_WINDOW_DAYS, MAX_PARTY, MIN_PARTY, seatingOptions } from "@/data/reservations";
import { addDaysISO, formatLongDate, formatTime, todayISO } from "@/lib/dates";
import { getAvailability } from "@/lib/reservations/service";
import type { AvailabilitySlot } from "@/lib/reservations/types";
import type { SeatingPreference } from "@/types/database";
import { cn } from "@/lib/cn";

/* ---------- Step 1: date ---------- */

export function StepDate({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const min = addDaysISO(todayISO(), 1);
  const max = addDaysISO(todayISO(), BOOKING_WINDOW_DAYS);
  return (
    <div>
      <DatePicker value={value} min={min} max={max} onChange={onChange} />
      {value ? <p className="mt-5 font-serif text-xl">{formatLongDate(value)}</p> : null}
    </div>
  );
}

/* ---------- Step 2: party size ---------- */

export function StepParty({ value, onChange }: { value: number | null; onChange: (n: number) => void }) {
  const sizes = Array.from({ length: MAX_PARTY - MIN_PARTY + 1 }, (_, i) => MIN_PARTY + i);
  return (
    <div>
      <div role="radiogroup" aria-label="Number of guests" className="grid grid-cols-4 gap-px bg-hair sm:grid-cols-8">
        {sizes.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
            className={cn(
              "t-num h-[52px] font-serif text-2xl transition-colors duration-150",
              value === n ? "bg-sumi text-washi" : "bg-washi hover:bg-stone",
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm text-ash">
        The counter seats {MAX_PARTY}. For nine or more guests, please{" "}
        <Link href="/private-dining" className="underline underline-offset-4 hover:text-tokiwa">
          enquire about private dining
        </Link>
        .
      </p>
    </div>
  );
}

/* ---------- Step 3: time ---------- */

type Load = { state: "loading" } | { state: "error"; message: string } | { state: "ready"; slots: AvailabilitySlot[] };

export function StepTime({
  date,
  partySize,
  value,
  onChange,
  onPickAnotherDate,
}: {
  date: string;
  partySize: number;
  value: string;
  onChange: (time: string) => void;
  onPickAnotherDate: () => void;
}) {
  const [load, setLoad] = useState<Load>({ state: "loading" });

  const fetchSlots = useCallback(async () => {
    setLoad({ state: "loading" });
    try {
      setLoad({ state: "ready", slots: await getAvailability(date, partySize) });
    } catch (e) {
      setLoad({ state: "error", message: e instanceof Error ? e.message : "We couldn't load times." });
    }
  }, [date, partySize]);

  useEffect(() => {
    // Fetch on entry and whenever date or party size changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchSlots();
  }, [fetchSlots]);

  if (load.state === "loading") {
    return (
      <div aria-busy="true" aria-live="polite">
        <p className="sr-only">Checking availability</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-[52px] animate-pulse bg-stone" />
          ))}
        </div>
      </div>
    );
  }

  if (load.state === "error") {
    return (
      <div role="alert" className="border border-hair p-6">
        <p className="font-serif text-xl">We couldn&rsquo;t check availability.</p>
        <p className="mt-2 text-sm text-ash">{load.message} Please try again.</p>
        <button type="button" onClick={fetchSlots} className="t-label mt-5 inline-flex h-11 items-center bg-sumi px-5 text-washi hover:bg-tokiwa">
          Try again
        </button>
      </div>
    );
  }

  const open = load.slots.filter((s) => s.status === "available");
  if (open.length === 0) {
    return (
      <div className="border border-hair p-6" role="status">
        <p className="font-serif text-xl">No times remain on {formatLongDate(date)}.</p>
        <p className="mt-2 max-w-prose text-sm text-ash">
          With {partySize} {partySize === 1 ? "guest" : "guests"}, this evening is full. Another date may have a seat, or call us and
          we will place you on the list.
        </p>
        <button type="button" onClick={onPickAnotherDate} className="t-label mt-5 inline-flex h-11 items-center bg-sumi px-5 text-washi hover:bg-tokiwa">
          Choose another date
        </button>
      </div>
    );
  }

  return (
    <div>
      <div role="radiogroup" aria-label="Seating time" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {load.slots.map((s) => {
          const selected = value === s.time;
          const unavailable = s.status === "unavailable";
          return (
            <button
              key={s.time}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={unavailable}
              disabled={unavailable}
              onClick={() => onChange(s.time)}
              className={cn(
                "t-num flex h-[52px] flex-col items-center justify-center border text-[0.8125rem] font-medium transition-colors duration-150",
                selected && "border-sumi bg-sumi text-washi",
                !selected && !unavailable && "border-ash/50 bg-washi hover:bg-stone",
                unavailable && "cursor-not-allowed border-transparent bg-stone text-ash",
              )}
            >
              <span className={cn(unavailable && "line-through decoration-hair")}>{formatTime(s.time)}</span>
              {unavailable ? <span className="sr-only">Unavailable</span> : null}
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-ash">
        {open.length} of {load.slots.length} seatings open for {partySize} {partySize === 1 ? "guest" : "guests"} on{" "}
        {formatLongDate(date)}.
      </p>
    </div>
  );
}

/* ---------- Step 4: seating ---------- */

export function StepSeating({
  value,
  partySize,
  onChange,
}: {
  value: SeatingPreference | "";
  partySize: number;
  onChange: (v: SeatingPreference) => void;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label="Seating preference" className="border-t border-hair">
        {seatingOptions.map((o) => {
          const selected = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.id)}
              className={cn(
                "flex w-full items-start gap-5 border-b border-hair px-1 py-6 text-left transition-colors duration-150 sm:px-4",
                selected ? "bg-sumi text-washi" : "hover:bg-stone",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("mt-2 h-3 w-3 shrink-0 rounded-full", selected ? "bg-kin" : "border border-ash")}
              />
              <span>
                <span className="t-h3 block">{o.label}</span>
                <span className={cn("mt-1 block max-w-[46ch] text-sm", selected ? "text-mist" : "text-ash")}>{o.description}</span>
              </span>
            </button>
          );
        })}
      </div>
      {value === "chefs_counter" || value === "no_preference" ? (
        <SeatPicker partySize={partySize} className="mt-10 max-w-md" />
      ) : null}
    </div>
  );
}
