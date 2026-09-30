import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { Rail } from "@/components/layout/Rail";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { restaurantJsonLd } from "@/lib/site";
import { site } from "@/data/restaurant";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/** Kanji only: the 回 mark and the formal seat numerals. Never used for running text. */
const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-shippori",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KAI | Japanese Omakase",
    template: "%s | KAI",
  },
  description: site.description,
  applicationName: "KAI",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#efe9db",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrument.variable} ${shippori.variable}`}>
      <body>
        <a
          href="#main"
          className="t-label sr-only z-50 bg-sumi px-4 py-3 text-washi focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Rail />
          <div className="lg:pl-[var(--rail-w)]">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </Providers>
        <script
          type="application/ld+json"
          // Static, first-party data only. No user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
      </body>
    </html>
  );
}
