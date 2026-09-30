import { z } from "zod";
import {
  BOOKING_WINDOW_DAYS,
  CLOSED_DAYS,
  MAX_PARTY,
  MIN_PARTY,
  TIME_SLOTS,
  occasionOptions,
} from "@/data/reservations";
import { addDaysISO, fromISODate, isValidISODate, todayISO } from "@/lib/dates";

/** Reusable field schemas. Shared by the reservation, private dining, and contact forms. */

export const nameField = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "That name is a little long. Please shorten it.");

export const emailField = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .pipe(z.email("That email address doesn't look right."));

export const phoneField = z
  .string()
  .trim()
  .min(1, "Please enter a phone number.")
  .regex(/^[+()\-.\s\d]+$/, "Use digits, spaces, and + ( ) - only.")
  .refine(
    (v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    },
    "Phone numbers need 7 to 15 digits.",
  );

export const dateField = z
  .string()
  .min(1, "Please choose a date.")
  .refine(isValidISODate, "That date isn't valid.")
  .refine((v) => v > todayISO(), "Please choose a future date. For same-day requests, call us.")
  .refine(
    (v) => v <= addDaysISO(todayISO(), BOOKING_WINDOW_DAYS),
    `We take reservations up to ${BOOKING_WINDOW_DAYS} days ahead.`,
  )
  .refine(
    (v) => !isValidISODate(v) || !CLOSED_DAYS.includes(fromISODate(v).getDay()),
    "KAI is closed on Mondays.",
  );

export const partySizeField = z
  .number({ error: "Please choose how many guests." })
  .int("Party size must be a whole number.")
  .min(MIN_PARTY, "At least one guest.")
  .max(MAX_PARTY, `The counter seats ${MAX_PARTY}. For larger groups, see private dining.`);

export const timeField = z
  .string()
  .min(1, "Please choose a time.")
  .refine((v) => (TIME_SLOTS as readonly string[]).includes(v), "That time isn't offered.");

export const seatingField = z.enum(["chefs_counter", "dining_table", "no_preference"], {
  error: "Please choose a seating preference.",
});

const occasionIds = occasionOptions.map((o) => o.id) as [string, ...string[]];

export const occasionField = z.enum(occasionIds).default("none");

/** Step schemas, so each step of the flow validates on its own. */
export const dateStepSchema = z.object({ reservation_date: dateField });
export const partyStepSchema = z.object({ party_size: partySizeField });
export const timeStepSchema = z.object({ reservation_time: timeField });
export const seatingStepSchema = z.object({ seating_preference: seatingField });

export const guestStepSchema = z.object({
  customer_name: nameField,
  email: emailField,
  phone: phoneField,
  occasion: occasionField,
  special_requests: z
    .string()
    .trim()
    .max(500, "Please keep requests under 500 characters.")
    .optional()
    .default(""),
});

/** The full request, validated again by the service before anything is stored. */
export const reservationInputSchema = z.object({
  ...dateStepSchema.shape,
  ...partyStepSchema.shape,
  ...timeStepSchema.shape,
  ...seatingStepSchema.shape,
  ...guestStepSchema.shape,
});

export type GuestStepValues = z.input<typeof guestStepSchema>;
export type GuestStepOutput = z.output<typeof guestStepSchema>;
export type ReservationInput = z.output<typeof reservationInputSchema>;
