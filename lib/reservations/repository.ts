import { MockReservationRepository } from "./mock-repository";
import type { AvailabilitySlot, NewReservation, Reservation } from "./types";

/**
 * The only thing the rest of the app knows about reservation storage.
 * UI -> service -> ReservationRepository -> (mock today, Supabase later).
 */
export interface ReservationRepository {
  create(input: NewReservation): Promise<Reservation>;
  getById(id: string): Promise<Reservation | null>;
  getAvailability(date: string, partySize: number): Promise<AvailabilitySlot[]>;
}

let instance: ReservationRepository | undefined;

/**
 * Single switch point. Phase 3 replaces this with `new SupabaseReservationRepository(client)`.
 * Nothing above this line in the stack has to change.
 */
export function getReservationRepository(): ReservationRepository {
  instance ??= new MockReservationRepository();
  return instance;
}
