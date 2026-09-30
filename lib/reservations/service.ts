import { addDaysISO, todayISO } from "@/lib/dates";
import { BOOKING_WINDOW_DAYS } from "@/data/reservations";
import { getReservationRepository } from "./repository";
import { parseReservationInput } from "./validation";
import {
  ReservationError,
  type AvailabilitySlot,
  type Reservation,
} from "./types";

/**
 * Business logic for reservations. UI components call these functions and never
 * see a repository or a database shape.
 */

export async function getAvailability(
  date: string,
  partySize: number,
): Promise<AvailabilitySlot[]> {
  if (date <= todayISO() || date > addDaysISO(todayISO(), BOOKING_WINDOW_DAYS)) {
    throw new ReservationError("validation", "That date is outside the booking window.");
  }
  return getReservationRepository().getAvailability(date, partySize);
}

/** Validate, re-check the slot, then store a `pending` request. */
export async function createReservation(raw: unknown): Promise<Reservation> {
  const input = parseReservationInput(raw);
  const repo = getReservationRepository();

  const slots = await repo.getAvailability(input.reservation_date, input.party_size);
  const slot = slots.find((s) => s.time === input.reservation_time);
  if (!slot || slot.status !== "available") {
    throw new ReservationError(
      "slot_taken",
      "That time was just taken. Please choose another.",
    );
  }

  return repo.create({
    customer_name: input.customer_name,
    email: input.email,
    phone: input.phone,
    reservation_date: input.reservation_date,
    reservation_time: input.reservation_time,
    party_size: input.party_size,
    seating_preference: input.seating_preference,
    occasion: input.occasion === "none" ? null : (input.occasion as Reservation["occasion"]),
    special_requests: input.special_requests ? input.special_requests : null,
  });
}

export async function getReservation(id: string): Promise<Reservation | null> {
  return getReservationRepository().getById(id);
}

/** Human-friendly reference shown to the guest, e.g. `KAI-3F9A2C`. */
export function referenceCode(id: string): string {
  return `KAI-${id.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase()}`;
}
