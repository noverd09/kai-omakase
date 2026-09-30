import { formatLongDate, formatTime } from "@/lib/dates";
import { occasionOptions, seatingOptions } from "@/data/reservations";
import type { SeatingPreference } from "@/types/database";

export interface SummaryValues {
  reservation_date?: string;
  reservation_time?: string;
  party_size?: number | null;
  seating_preference?: SeatingPreference | "";
  customer_name?: string;
  email?: string;
  phone?: string;
  occasion?: string | null;
  special_requests?: string | null;
}

type Row = { key: string; label: string; value: string; step?: string };

export function summaryRows(v: SummaryValues, opts: { includeGuest?: boolean } = {}): Row[] {
  const rows: Row[] = [];
  if (v.reservation_date) rows.push({ key: "date", label: "Date", value: formatLongDate(v.reservation_date), step: "date" });
  if (v.reservation_time) rows.push({ key: "time", label: "Time", value: formatTime(v.reservation_time), step: "time" });
  if (v.party_size) rows.push({ key: "party", label: "Guests", value: `${v.party_size} ${v.party_size === 1 ? "guest" : "guests"}`, step: "party" });
  if (v.seating_preference) {
    rows.push({
      key: "seating",
      label: "Seating",
      value: seatingOptions.find((o) => o.id === v.seating_preference)?.label ?? "",
      step: "seating",
    });
  }
  if (opts.includeGuest) {
    if (v.customer_name) rows.push({ key: "name", label: "Name", value: v.customer_name, step: "details" });
    if (v.email) rows.push({ key: "email", label: "Email", value: v.email, step: "details" });
    if (v.phone) rows.push({ key: "phone", label: "Phone", value: v.phone, step: "details" });
    if (v.occasion && v.occasion !== "none") {
      rows.push({ key: "occasion", label: "Occasion", value: occasionOptions.find((o) => o.id === v.occasion)?.label ?? v.occasion, step: "details" });
    }
    if (v.special_requests) rows.push({ key: "requests", label: "Requests", value: v.special_requests, step: "details" });
  }
  return rows;
}

/** A definition list of the request so far. `onEdit` adds a "Change" action per row. */
export function ReservationSummary({
  values,
  includeGuest = false,
  onEdit,
  className,
}: {
  values: SummaryValues;
  includeGuest?: boolean;
  onEdit?: (step: string) => void;
  className?: string;
}) {
  const rows = summaryRows(values, { includeGuest });
  if (rows.length === 0) {
    return <p className={className}>Your choices will appear here as you make them.</p>;
  }
  return (
    <dl className={className}>
      {rows.map((r) => (
        <div key={r.key} className="grid grid-cols-[6rem_1fr_auto] items-baseline gap-x-4 border-b border-hair py-4 first:border-t">
          <dt className="t-label text-ash">{r.label}</dt>
          <dd className="break-words font-serif text-lg leading-snug">{r.value}</dd>
          {onEdit && r.step ? (
            <dd>
              <button
                type="button"
                onClick={() => onEdit(r.step!)}
                className="t-label inline-flex min-h-11 items-center px-1 text-ash underline underline-offset-4 hover:text-tokiwa"
              >
                Change<span className="sr-only"> {r.label.toLowerCase()}</span>
              </button>
            </dd>
          ) : (
            <dd />
          )}
        </div>
      ))}
    </dl>
  );
}
