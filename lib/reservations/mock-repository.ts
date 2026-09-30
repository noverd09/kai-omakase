import { TIME_SLOTS } from "@/data/reservations";
import type { ReservationRepository } from "./repository";
import {
  ReservationError,
  type AvailabilitySlot,
  type NewReservation,
  type Reservation,
} from "./types";

const STORAGE_KEY = "kai.reservations.v1";
const LATENCY_MS = 380;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Small deterministic string hash so mock availability is stable per date. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `res_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * In-browser stand-in for the future Supabase table.
 * Records live in `localStorage` (falling back to memory if it is blocked), so a
 * submitted request survives a refresh but never leaves the visitor's device.
 * Reservations created here are always `pending`. Nothing here can confirm one.
 */
export class MockReservationRepository implements ReservationRepository {
  private memory: Reservation[] = [];

  private read(): Reservation[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Reservation[]) : this.memory;
    } catch {
      return this.memory;
    }
  }

  private write(rows: Reservation[]) {
    this.memory = rows;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {
      /* storage blocked; memory copy is kept for this session */
    }
  }

  async getAvailability(date: string, partySize: number): Promise<AvailabilitySlot[]> {
    await wait(LATENCY_MS);
    // Roughly one date in nine is fully booked, to exercise the empty state.
    const dayFull = hash(`${date}:day`) % 9 === 0;
    const taken = new Set(
      this.read()
        .filter((r) => r.reservation_date === date && r.status !== "cancelled")
        .map((r) => r.reservation_time),
    );
    // Bigger parties need more of the counter, so fewer slots remain.
    const modulus = partySize >= 5 ? 3 : 5;
    return TIME_SLOTS.map((time) => ({
      time,
      status:
        dayFull || taken.has(time) || hash(`${date}:${time}`) % modulus === 0
          ? "unavailable"
          : "available",
    }));
  }

  async create(input: NewReservation): Promise<Reservation> {
    await wait(LATENCY_MS + 250);
    // Demo hook for the "server error" state: append ?simulate=error to /reservations.
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("simulate") === "error") {
      throw new ReservationError("server_error", "Something went wrong on our side.");
    }
    const now = new Date().toISOString();
    const row: Reservation = {
      ...input,
      id: newId(),
      status: "pending",
      created_at: now,
      updated_at: now,
    };
    this.write([...this.read(), row]);
    return row;
  }

  async getById(id: string): Promise<Reservation | null> {
    await wait(120);
    return this.read().find((r) => r.id === id) ?? null;
  }
}
