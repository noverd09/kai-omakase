import type { RestaurantSettingsRow } from "@/types/database";

/**
 * KAI is a fictional portfolio project. Every detail below is invented.
 * The phone number uses the reserved 555-01xx range and the email uses the
 * reserved `.example` domain, so nothing here points at a real business.
 */
export const restaurant: RestaurantSettingsRow = {
  id: "singleton",
  restaurant_name: "KAI",
  address: "27 Hinoki Lane, Old Quarter",
  phone: "+1 (555) 010-0816",
  email: "reservations@kai.example",
  opening_hours: [
    { day: 0, label: "Sunday", hours: "5:00 PM to 9:30 PM" },
    { day: 1, label: "Monday", hours: null },
    { day: 2, label: "Tuesday", hours: "5:30 PM to 10:00 PM" },
    { day: 3, label: "Wednesday", hours: "5:30 PM to 10:00 PM" },
    { day: 4, label: "Thursday", hours: "5:30 PM to 10:00 PM" },
    { day: 5, label: "Friday", hours: "5:30 PM to 11:00 PM" },
    { day: 6, label: "Saturday", hours: "5:30 PM to 11:00 PM" },
  ],
  reservation_policy:
    "One seating per evening. Seats are held for 15 minutes past the reserved time. Cancellations are welcome up to 48 hours before; after that a deposit may apply. Please tell us about allergies when you reserve, since the menu is prepared in advance.",
};

export const tagline = "Japanese Omakase";

export const counterSeats = 8;

export const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Journal", href: "/about" },
] as const;

export const site = {
  name: "KAI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kai.vercel.app",
  description:
    "KAI is an eight-seat Japanese omakase counter. One seating each evening, chef-led, seasonal, quietly luxurious. A fictional portfolio project.",
} as const;
