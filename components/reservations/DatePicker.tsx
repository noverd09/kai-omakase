"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CLOSED_DAYS } from "@/data/reservations";
import { addDaysISO, formatLongDate, fromISODate, toISODate } from "@/lib/dates";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthLabel = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(d);

/**
 * A month-grid date picker with roving focus: Tab lands on one day, arrow keys
 * move by day and week, Home/End jump to the row ends, PageUp/PageDown change month.
 */
export function DatePicker({
  value,
  min,
  max,
  onChange,
}: {
  value: string;
  min: string;
  max: string;
  onChange: (iso: string) => void;
}) {
  const initial = value || min;
  const [cursor, setCursor] = useState(() => {
    const d = fromISODate(initial);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [focusIso, setFocusIso] = useState(initial);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  const isDisabled = (iso: string) =>
    iso < min || iso > max || CLOSED_DAYS.includes(fromISODate(iso).getDay());

  const cells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const lead = new Date(y, m, 1).getDay();
    const count = new Date(y, m + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: count }, (_, i) => toISODate(new Date(y, m, i + 1))),
    ];
  }, [cursor]);

  // The tabbable day is the selection, else the focus target if it is on screen, else the first open day.
  const firstOpen = cells.find((c): c is string => !!c && !isDisabled(c)) ?? null;
  const tabbable =
    value && cells.includes(value) && !isDisabled(value)
      ? value
      : cells.includes(focusIso) && !isDisabled(focusIso)
        ? focusIso
        : firstOpen;

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusIso}"]`)?.focus();
  }, [focusIso, cursor]);

  const goToMonth = (delta: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));

  const canPrev = toISODate(new Date(cursor.getFullYear(), cursor.getMonth(), 0)) >= min;
  const canNext = toISODate(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)) <= max;

  const move = (from: string, step: number) => {
    // Step until an open day, staying inside the booking window.
    let next = from;
    for (let i = 0; i < 40; i++) {
      next = addDaysISO(next, step);
      if (next < min || next > max) return null;
      if (!isDisabled(next)) return next;
    }
    return null;
  };

  const onKeyDown = (e: React.KeyboardEvent, iso: string) => {
    const keys: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let target: string | null = null;
    if (e.key in keys) target = move(iso, keys[e.key]);
    else if (e.key === "PageDown") target = move(iso, 28);
    else if (e.key === "PageUp") target = move(iso, -28);
    else return;
    e.preventDefault();
    if (!target) return;
    shouldFocus.current = true;
    setFocusIso(target);
    const t = fromISODate(target);
    setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
  };

  return (
    <div className="max-w-[26rem]">
      <div className="flex items-center justify-between border-b border-hair pb-3">
        <h3 className="t-h3" aria-live="polite">
          {monthLabel(cursor)}
        </h3>
        <div className="flex">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="inline-flex h-11 w-11 items-center justify-center hover:bg-stone disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            disabled={!canNext}
            aria-label="Next month"
            className="inline-flex h-11 w-11 items-center justify-center hover:bg-stone disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div ref={gridRef} role="group" aria-label={`Choose a date, ${monthLabel(cursor)}`} className="mt-3 grid grid-cols-7">
        {WEEKDAYS.map((d, i) => (
          <span key={d} className="t-label flex h-9 items-center justify-center text-ash">
            <abbr title={WEEKDAY_NAMES[i]} className="no-underline">
              {d}
            </abbr>
          </span>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={`b${i}`} aria-hidden="true" />;
          const disabled = isDisabled(iso);
          const selected = iso === value;
          const day = fromISODate(iso).getDate();
          return (
            <button
              key={iso}
              type="button"
              data-date={iso}
              disabled={disabled}
              aria-pressed={selected}
              aria-label={formatLongDate(iso)}
              tabIndex={iso === tabbable ? 0 : -1}
              onClick={() => {
                setFocusIso(iso);
                onChange(iso);
              }}
              onKeyDown={(e) => onKeyDown(e, iso)}
              className={cn(
                "t-num flex h-11 items-center justify-center text-sm transition-colors duration-150",
                selected ? "bg-sumi text-washi" : "hover:bg-stone",
                disabled && "cursor-not-allowed text-mist line-through decoration-hair hover:bg-transparent",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-ash">Closed Mondays. Same-day requests: please call us.</p>
    </div>
  );
}
