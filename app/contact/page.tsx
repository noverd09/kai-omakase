import { pageMetadata } from "@/lib/site";
import { restaurant } from "@/data/restaurant";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button, TextLink } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Address, opening hours, phone, and email for KAI, plus a contact form. Reservations are made online.",
  path: "/contact",
});

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`;

export default function ContactPage() {
  const tel = `tel:${restaurant.phone.replace(/[^+\d]/g, "")}`;
  return (
    <div className="section pt-10 lg:pt-16">
      <div className="wrap">
        <h1 className="t-display" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
          Contact
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-12">
            <section aria-labelledby="visit">
              <h2 id="visit" className="t-label text-kin-deep">
                Visit
              </h2>
              <address className="mt-4 font-serif text-2xl not-italic leading-snug">{restaurant.address}</address>
              <p className="mt-4 text-sm text-ash">
                Address is fictional. <TextLink href={mapsHref} target="_blank" rel="noreferrer">Get directions</TextLink>
              </p>
              <div
                role="img"
                aria-label="Map placeholder. An embedded map will go here once the address is real."
                className="mt-6 flex aspect-[16/9] items-center justify-center border border-hair bg-stone [background-image:linear-gradient(to_right,var(--color-hair)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-hair)_1px,transparent_1px)] [background-size:48px_48px]"
              >
                <span className="t-label bg-washi px-3 py-2 text-ash">Map placeholder</span>
              </div>
            </section>

            <section aria-labelledby="reach">
              <h2 id="reach" className="t-label text-kin-deep">
                Reach us
              </h2>
              <p className="mt-4">
                <a className="font-serif text-2xl hover:text-tokiwa" href={tel}>
                  {restaurant.phone}
                </a>
              </p>
              <p className="mt-1">
                <a className="inline-flex min-h-11 items-center text-ash underline underline-offset-4 hover:text-tokiwa" href={`mailto:${restaurant.email}`}>
                  {restaurant.email}
                </a>
              </p>
            </section>

            <section aria-labelledby="hours">
              <h2 id="hours" className="t-label text-kin-deep">
                Opening hours
              </h2>
              <dl className="mt-4 max-w-sm border-t border-hair">
                {restaurant.opening_hours.map((d) => (
                  <div key={d.day} className="flex justify-between gap-6 border-b border-hair py-3 text-sm">
                    <dt>{d.label}</dt>
                    <dd className="t-num text-ash">{d.hours ?? "Closed"}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-ash">One seating each evening, beginning between 5:30 and 8:30 PM.</p>
            </section>
          </div>

          <div>
            <h2 className="t-h1">Write to us</h2>
            <p className="measure mt-4 text-ash">For questions about the menu, allergies, or anything else. We reply within two business days.</p>
            <div className="mt-10">
              <ContactForm />
            </div>
            <div className="mt-16 border-t border-hair pt-10">
              <p className="font-serif text-2xl">Looking for a seat?</p>
              <p className="mt-2 text-sm text-ash">Reservations are quickest online.</p>
              <div className="mt-6">
                <Button href="/reservations">Reserve a Table</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
