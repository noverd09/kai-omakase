import type { Metadata } from "next";
import { restaurant, site } from "@/data/restaurant";

export const nav = [
  { href: "/menu", label: "Menu", jp: "品書" },
  { href: "/experience", label: "Experience", jp: "体験" },
  { href: "/private-dining", label: "Private Dining", jp: "貸切" },
  { href: "/about", label: "About", jp: "私たち" },
  { href: "/contact", label: "Contact", jp: "連絡" },
] as const;

/** Formal Japanese numerals for the eight counter seats. */
export const seatNumerals = ["壱", "弐", "参", "肆", "伍", "陸", "漆", "捌"] as const;

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === "/" ? `${site.name} | ${title}` : `${title} | ${site.name}`;
  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: "/images/plate-awabi.jpg", width: 1920, height: 1080, alt: "Awabi sashimi with gold leaf on a green ceramic plate." }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/plate-awabi.jpg"],
    },
  };
}

/**
 * Restaurant structured data. KAI is fictional, so this carries only the
 * placeholder details from `data/restaurant.ts`. Replace with real business
 * information (address, geo, sameAs, priceRange) before a real launch.
 */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.restaurant_name,
    description: site.description,
    url: site.url,
    servesCuisine: "Japanese, Omakase, Sushi",
    telephone: restaurant.phone,
    email: restaurant.email,
    address: { "@type": "PostalAddress", streetAddress: restaurant.address },
    acceptsReservations: true,
    image: `${site.url}/images/plate-awabi.jpg`,
  };
}
