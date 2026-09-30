# KAI

A premium restaurant website and reservation lead-generation system for **KAI**, a fictional eight-seat Japanese omakase counter. Built as a portfolio project: premium UI/UX, conversion-focused multi-step forms, and a data architecture that is ready for Supabase without a frontend rewrite.

> KAI is fictional. The address, phone number, chef, menu and prices are invented. Photographs are public-domain stand-ins (see [`public/images/CREDITS.md`](public/images/CREDITS.md)).

**Live:** https://kai.vercel.app

## The journey it is built around

Discover KAI, understand the experience, explore the menu, **Reserve a Table**, submit a request, see an honest confirmation state.

A submitted reservation is always a `pending` **request**. The UI never says a table is confirmed, because nothing in the app can confirm one.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, React Hook Form + Zod, Motion (only where it earns its place).

## Design

"Hinoki Ledger": a chef's ledger of courses on washi paper. The recurring brand device is the **counter line**, a hairline with eight gold seat marks (one per seat at the counter). It is the section divider, the scroll indicator, the seating picker, and the confirmation stamp. Full system in [`DESIGN.md`](DESIGN.md), which lints clean with `@google/design.md`.

## Architecture

```
ReservationFlow (UI)
   -> reservation service   lib/reservations/service.ts     validation + business rules
   -> ReservationRepository lib/reservations/repository.ts  the interface, and the single swap point
   -> MockReservationRepository (localStorage today)  |  SupabaseReservationRepository (later)
```

```
app/          routes, metadata, sitemap, robots
components/   ui, layout, home, menu, reservations, forms
lib/          site, dates, reservations/{types,validation,repository,mock-repository,service}, inquiries
schemas/      Zod schemas (reservation, private dining, contact)
data/         mock menu, restaurant, chef, reservation options
types/        database.ts: TypeScript mirror of the future Supabase tables
docs/         supabase-plan.md
```

Components never import a repository or a database shape. Swapping storage means changing one function, `getReservationRepository()`.

## Pages

`/`, `/menu`, `/experience`, `/private-dining`, `/about`, `/reservations`, `/contact`

## Reservation flow

Date, party size, time, seating, guest details, review, confirmation. Mock availability is deterministic per date (about one date in nine is fully booked, and bigger parties see fewer slots). Handled states: loading, no availability, slot taken, validation errors, server error, success.

Demo hook: append `?simulate=error` to `/reservations`, `/private-dining` or `/contact` to see the server-error state.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Quality checks run before handoff

- `tsc --noEmit` and `eslint`: clean.
- End-to-end run in Chrome (Playwright) over the full reservation flow, validation, the no-availability and server-error states, both lead forms, menu tabs, and keyboard behavior: 34 checks pass.
- axe-core (WCAG 2 A/AA plus best practices) on all 7 pages at desktop and mobile widths: no violations.
- No console errors, no horizontal scroll at 390px, no em dashes in shipped copy.
- `prefers-reduced-motion` verified: no content is ever hidden.

## Roadmap

See [`docs/supabase-plan.md`](docs/supabase-plan.md): Phase 1 (this) frontend and mock data, Phase 2 Supabase Auth, Postgres and Storage, Phase 3 reservation backend, Phase 4 staff admin dashboard.
