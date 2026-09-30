import Link from "next/link";
import { nav } from "@/lib/site";
import { restaurant, social, tagline } from "@/data/restaurant";
import { Button } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";
import { Logo } from "./Logo";

/** Ft1 masthead: wordmark and tagline anchor one band, a few links beneath. */
export function Footer() {
  const today = restaurant.opening_hours;
  return (
    <footer className="on-ink bg-sumi text-washi">
      <div className="wrap section">
        <CounterLine tone="dark" />

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo className="[&>span:first-child]:text-5xl sm:[&>span:first-child]:text-6xl [&>span:last-child]:text-3xl" />
            <p className="t-label mt-5 text-mist">{tagline}</p>
          </div>
          <Button href="/reservations" variant="inverse">
            Reserve a Table
          </Button>
        </div>

        <div className="mt-16 grid gap-12 border-t border-mist/30 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <p className="t-label mb-4 text-kin">Explore</p>
            <ul className="space-y-1 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-kin">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reservations" className="inline-flex min-h-11 items-center hover:text-kin">
                  Reservations
                </Link>
              </li>
            </ul>
          </nav>

          <address className="text-sm not-italic text-mist">
            <p className="t-label mb-4 text-kin">Visit</p>
            <p>{restaurant.address}</p>
            <p className="mt-3">
              <a className="inline-flex min-h-11 items-center hover:text-washi" href={`tel:${restaurant.phone.replace(/[^+\d]/g, "")}`}>
                {restaurant.phone}
              </a>
            </p>
            <p>
              <a className="inline-flex min-h-11 items-center hover:text-washi" href={`mailto:${restaurant.email}`}>
                {restaurant.email}
              </a>
            </p>
          </address>

          <div className="text-sm text-mist">
            <p className="t-label mb-4 text-kin">Hours</p>
            <ul className="space-y-1">
              {today.map((d) => (
                <li key={d.day} className="flex justify-between gap-4">
                  <span>{d.label.slice(0, 3)}</span>
                  <span className="t-num text-right">{d.hours ?? "Closed"}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-mist">
            <p className="t-label mb-4 text-kin">Follow</p>
            <ul className="space-y-1">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex min-h-11 items-center hover:text-washi"
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-mist/30 pt-6 text-xs text-mist">
          KAI is a fictional restaurant created for a design and development portfolio. The address, phone number, chef,
          and menu are invented. Photographs are public-domain stand-ins; see the credits file in the repository.
        </p>
      </div>
    </footer>
  );
}
