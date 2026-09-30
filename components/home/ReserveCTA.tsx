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
    <section className="on-green section relative overflow-hidden bg-tokiwa text-washi">
      <span aria-hidden="true" data-glyph="回" className="watermark -bottom-[8%] -right-[4vw] text-[clamp(16rem,42vw,38rem)] text-washi" />
      <div className="wrap relative">
        <CounterLine tone="dark" labeled />
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
