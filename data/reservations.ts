import type { Occasion, SeatingPreference } from "@/types/database";

export const seatingOptions: {
  id: SeatingPreference;
  label: string;
  description: string;
}[] = [
  {
    id: "chefs_counter",
    label: "Chef's Counter",
    description: "Eight seats at the hinoki counter. The chef prepares each piece in front of you.",
  },
  {
    id: "dining_table",
    label: "Dining Table",
    description: "A quiet table behind the counter, for parties who want more room to talk.",
  },
  {
    id: "no_preference",
    label: "No Preference",
    description: "We seat you where the evening works best. The counter is offered first.",
  },
];

export const occasionOptions: { id: Occasion; label: string }[] = [
  { id: "none", label: "No special occasion" },
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "business", label: "Business dinner" },
  { id: "celebration", label: "Celebration" },
  { id: "other", label: "Something else" },
];

/** Seating start times, 5:30 PM to 8:30 PM. */
export const TIME_SLOTS = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const MIN_PARTY = 1;
/** The counter has eight seats, so larger groups are directed to private dining. */
export const MAX_PARTY = 8;

/** Bookable window: tomorrow through this many days ahead. */
export const BOOKING_WINDOW_DAYS = 60;

/** Days KAI is closed (0 = Sunday). */
export const CLOSED_DAYS: readonly number[] = [1];
