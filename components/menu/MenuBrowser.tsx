"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { menuCategories, menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/database";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const categoryPhoto: Partial<Record<MenuCategory, { src: string; alt: string; position?: string }>> = {
  omakase: { src: "/images/plate-awabi.jpg", alt: "Steamed abalone with gold leaf on a green ceramic plate.", position: "40% 50%" },
  sushi: { src: "/images/nigiri-plate.jpg", alt: "Tuna and salmon nigiri on a pale ceramic plate with pickled ginger and wasabi." },
  sashimi: { src: "/images/sashimi-hinoki.jpg", alt: "Tuna belly, sea bream, and white fish sashimi on a hinoki board over shaved daikon." },
  "small-plates": { src: "/images/bowl-chopsticks.jpg", alt: "A patterned brown bowl of firefly squid beside wooden chopsticks.", position: "62% 30%" },
};

const priceUnit: Partial<Record<MenuCategory, string>> = {
  omakase: "per guest",
  sushi: "per piece",
  sake: "glass",
};

const isCategory = (v: string): v is MenuCategory => menuCategories.some((c) => c.id === v);

/** Category tabs with arrow-key support; the active category is mirrored in the URL hash. */
export function MenuBrowser() {
  const [active, setActive] = useState<MenuCategory>("omakase");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (isCategory(h)) setActive(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: MenuCategory) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = menuCategories.length - 1;
    const to = e.key === "ArrowRight" ? (i + 1) % (last + 1) : e.key === "ArrowLeft" ? (i - 1 + last + 1) % (last + 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (to === null) return;
    e.preventDefault();
    const id = menuCategories[to].id;
    select(id);
    tabRefs.current[id]?.focus();
  };

  const category = menuCategories.find((c) => c.id === active)!;
  const items = menuItems.filter((i) => i.category === active);
  const photo = categoryPhoto[active];

  return (
    <div>
      <div role="tablist" aria-label="Menu categories" className="-mx-5 flex overflow-x-auto border-b border-hair px-5 sm:mx-0 sm:px-0">
        {menuCategories.map((c, i) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[c.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={selected}
              aria-controls={`panel-${c.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(c.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative shrink-0 px-4 py-4 transition-colors duration-200 first:pl-0 sm:px-6",
                selected ? "text-sumi" : "text-ash hover:text-sumi",
              )}
            >
              <span className="t-label">{c.label}</span>
              {selected ? (
                <motion.span
                  layoutId="menu-tab-line"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-sumi first:left-0 sm:first:left-0"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="mt-12 grid gap-12 outline-none focus-visible:outline-2 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20"
      >
        <div className="lg:sticky lg:top-16 lg:self-start">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              <p className="t-kanji text-3xl text-tokiwa" aria-hidden="true" lang="ja">
                {category.jp}
              </p>
              <h2 className="t-h1 mt-3">{category.label}</h2>
              <p className="t-lead measure mt-4 text-ash">{category.blurb}</p>
              {photo ? (
                <div className="mt-8 hidden lg:block">
                  <Photo src={photo.src} alt={photo.alt} sizes="32vw" aspect="4 / 3" position={photo.position} />
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            {items.length === 0 ? (
              <div className="border border-hair p-8" role="status">
                <p className="font-serif text-xl">Nothing on this list today.</p>
                <p className="mt-2 text-sm text-ash">The chef is still choosing. Please check another category.</p>
              </div>
            ) : (
              <ul className="border-t border-hair">
                {items.map((item) => (
                  <li key={item.id} className="ledger-row border-b border-hair py-6">
                    <div className="flex items-baseline gap-3">
                      <h3 className={cn("t-h3", !item.is_available && "text-ash line-through decoration-hair")}>{item.name}</h3>
                      <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-mist" />
                      <p className="t-num shrink-0 font-medium">
                        {item.is_available ? (
                          <>
                            <span className="sr-only">Price: </span>${item.price}
                            {priceUnit[item.category] ? (
                              <span className="ml-2 text-xs font-normal text-ash">{priceUnit[item.category]}</span>
                            ) : null}
                          </>
                        ) : (
                          <span className="t-label text-ash">Sold out</span>
                        )}
                      </p>
                    </div>
                    <p className="mt-1 max-w-[52ch] text-sm text-ash">{item.description}</p>
                  </li>
                ))}
              </ul>
            )}

            {active === "omakase" ? (
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button href="/reservations">Reserve a Table</Button>
                <p className="max-w-[36ch] text-sm text-ash">
                  Omakase is the only way to sit at the counter. Nigiri and small plates are ordered à la carte at the tables.
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-16 text-xs text-ash">
        Prices in US dollars, exclusive of tax and service. KAI is fictional; dishes and prices are invented for this portfolio
        project.
      </p>
    </div>
  );
}
