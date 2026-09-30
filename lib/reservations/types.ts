import type { ReservationInsert, ReservationRow } from "@/types/database";

/** The domain model the UI works with. Today it equals the future table row. */
export type Reservation = ReservationRow;
export type NewReservation = ReservationInsert;

export type SlotStatus = "available" | "unavailable";

export interface AvailabilitySlot {
  time: string;
  status: SlotStatus;
}

export type ReservationErrorCode =
  | "validation"
  | "slot_taken"
  | "not_found"
  | "server_error";

export class ReservationError extends Error {
  constructor(
    public readonly code: ReservationErrorCode,
    message: string,
    public readonly fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ReservationError";
  }
}
