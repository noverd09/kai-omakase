# Supabase integration plan

Nothing here is connected yet. The app is structured so each phase is a swap, not a rewrite.

## Phase 1: current

Frontend plus mock data. Reservations, private dining inquiries and contact messages are stored in the visitor's own browser (`localStorage`). Types for the future schema live in `types/database.ts`.

## Phase 2: Supabase

Connect Supabase Auth, Postgres and Storage.

1. Create a project and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Vercel env). Keep the service role key server-only.
2. Create the tables below and enable Row Level Security on every one.
3. Move menu images to Storage and store the public URL in `menu_items.image`.

### Proposed schema

```sql
create type reservation_status as enum ('pending','confirmed','cancelled','completed');
create type seating_preference as enum ('chefs_counter','dining_table','no_preference');

create table reservations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  reservation_date date not null,
  reservation_time time not null,
  party_size int not null check (party_size between 1 and 8),
  seating_preference seating_preference not null default 'no_preference',
  occasion text,
  special_requests text,
  status reservation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table menu_items (
  id text primary key,
  name text not null,
  description text not null,
  category text not null,
  price numeric(8,2) not null,
  image text,
  is_featured boolean not null default false,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create table restaurant_settings (
  id text primary key default 'singleton',
  restaurant_name text not null,
  address text not null,
  phone text not null,
  email text not null,
  opening_hours jsonb not null,
  reservation_policy text not null
);

create table private_dining_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  event_date date not null,
  guest_count int not null,
  event_type text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
```

### Row Level Security (starting point)

- `reservations` and `private_dining_inquiries`: anonymous `insert` only, with a check that `status` is `pending` or `new`. No anonymous `select`. Staff read and update through authenticated roles.
- `menu_items` and `restaurant_settings`: public `select`; writes for staff only.
- Availability must be computed server-side (a Postgres function or route handler), never by exposing the reservations table to the browser.

## Phase 3: reservation backend

1. Add `lib/reservations/supabase-repository.ts` implementing `ReservationRepository`.
2. Change `getReservationRepository()` to return it. No component changes.
3. Move `create` behind a Server Action or route handler so validation (`parseReservationInput`) and availability are enforced on the server. The Zod schemas already work on both sides.
4. Replace mock availability with a real capacity check per seating.
5. Send transactional email on create and on status change. Only a staff action may set `confirmed`.

## Phase 4: admin dashboard

`/admin/reservations`, `/admin/menu`, `/admin/settings`, behind Supabase Auth with a staff role. Staff can view, confirm, cancel and update reservation status, and manage menu items and settings.
