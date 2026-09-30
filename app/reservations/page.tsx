import { pageMetadata } from "@/lib/site";
import { Words } from "@/components/ui/Words";
import { restaurant } from "@/data/restaurant";
import { ReservationFlow } from "@/components/reservations/ReservationFlow";
import { TextLink } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Reserve a Table",
  description:
    "Request a seat at KAI's eight-seat omakase counter. Choose a date, party size, and time; we confirm by email within a day.",
  path: "/reservations",
});

export default function ReservationsPage() {
  return (
    <div className="section pt-10 lg:pt-16">
      <div className="wrap">
        <header className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <h1 className="t-display" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
              <Words text="Reserve a Table" mode="load" />
            </h1>
            <p className="t-lead measure mt-6 text-ash">
              Send us a request in six short steps. We reply by email within a day, and only then is your seat held.
            </p>
          </div>
          <div className="self-end text-sm text-ash">
            <p>Prefer to talk?</p>
            <TextLink href={`tel:${restaurant.phone.replace(/[^+\d]/g, "")}`}>{restaurant.phone}</TextLink>
          </div>
        </header>

        <ReservationFlow />

        <p className="mt-20 max-w-prose text-xs text-ash">
          {restaurant.reservation_policy} This is a portfolio demo: requests are stored only in your own browser and nothing
          is sent.
        </p>
      </div>
    </div>
  );
}
