import { Button, TextLink } from "@/components/ui/Button";
import { CounterLine } from "@/components/ui/CounterLine";
import { Reveal } from "@/components/ui/Reveal";

/** C2 statement close. Deliberately the one large mid-page statement. */
export function ReserveCTA({
  title = "Your seat at the counter awaits.",
  body = "Eight seats, one seating, Tuesday to Sunday. Send a request and we will confirm by email within a day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-green section bg-tokiwa text-washi">
      <div className="wrap">
        <CounterLine tone="dark" />
        <Reveal className="mt-16 max-w-4xl">
          <h2 className="t-display" style={{ fontSize: "clamp(2.5rem, 6.6vw, 5.25rem)" }}>
            {title}
          </h2>
          <p className="t-lead measure mt-8 text-stone">{body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Button href="/reservations" variant="inverse">
              Reserve a Table
            </Button>
            <TextLink href="/menu" className="text-washi">
              View the Menu
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
