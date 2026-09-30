/**
 * Database types for the future Supabase PostgreSQL schema.
 *
 * These mirror the planned tables one-to-one (snake_case columns). Nothing here
 * talks to a database. The app reads and writes through repositories in `lib/`,
 * so swapping the mock repositories for Supabase ones does not touch the UI.
 *
 * Dates are ISO strings: `reservation_date` is `YYYY-MM-DD`, `reservation_time`
 * is 24h `HH:mm`, timestamps are full ISO 8601 (`timestamptz` in Postgres).
 */

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type SeatingPreference = "chefs_counter" | "dining_table" | "no_preference";

export type Occasion =
  | "none"
  | "birthday"
  | "anniversary"
  | "business"
  | "celebration"
  | "other";

/** Table: reservations */
export interface ReservationRow {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  seating_preference: SeatingPreference;
  occasion: Occasion | null;
  special_requests: string | null;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

export type ReservationInsert = Omit<
  ReservationRow,
  "id" | "status" | "created_at" | "updated_at"
>;

export type MenuCategory =
  | "omakase"
  | "sushi"
  | "sashimi"
  | "small-plates"
  | "dessert"
  | "sake";

/** Table: menu_items */
export interface MenuItemRow {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  /** Whole US dollars. Use a `numeric(8,2)` column in Postgres. */
  price: number;
  /** Path in `public/` today, a Supabase Storage URL later. */
  image: string | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
}

export interface OpeningHoursRow {
  /** 0 = Sunday ... 6 = Saturday */
  day: number;
  label: string;
  /** Null means closed. */
  hours: string | null;
}

/** Table: restaurant_settings (single row) */
export interface RestaurantSettingsRow {
  id: string;
  restaurant_name: string;
  address: string;
  phone: string;
  email: string;
  opening_hours: OpeningHoursRow[];
  reservation_policy: string;
}

export type InquiryStatus = "new" | "contacted" | "quoted" | "booked" | "declined";

/** Table: private_dining_inquiries */
export interface PrivateDiningInquiryRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  guest_count: number;
  event_type: string;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
}

export type PrivateDiningInquiryInsert = Omit<
  PrivateDiningInquiryRow,
  "id" | "status" | "created_at"
>;
