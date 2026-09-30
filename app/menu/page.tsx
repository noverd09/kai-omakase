import { pageMetadata } from "@/lib/site";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { ReserveCTA } from "@/components/home/ReserveCTA";

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "The KAI menu: omakase in twelve or eighteen courses, nigiri, sashimi, small plates, dessert, and a short sake list. Seasonal and chef-led.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <div className="section pb-[calc(var(--section-y)*0.75)] pt-10 lg:pt-16">
        <div className="wrap">
          <header className="mb-14 max-w-3xl">
            <h1 className="t-display" style={{ fontSize: "clamp(2.75rem, 6.6vw, 5rem)" }}>
              The Menu
            </h1>
            <p className="t-lead measure mt-6 text-ash">
              What follows changes with the market. Treat it as a record of the season, not a promise for the night.
            </p>
          </header>
          <MenuBrowser />
        </div>
      </div>
      <ReserveCTA
        title="Ready to be served?"
        body="The counter seats eight, once each evening. Send a request and we will find you a seat."
      />
    </>
  );
}
