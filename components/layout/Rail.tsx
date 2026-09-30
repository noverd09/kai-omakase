"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { nav, seatNumerals } from "@/lib/site";
import { restaurant, counterSeats } from "@/data/restaurant";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

/** Vertical counter: eight marks that fill with ink as the page scrolls. */
function ScrollCounter() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [filled, setFilled] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFilled(Math.min(counterSeats, Math.floor(v * (counterSeats + 0.999))));
  });
  return (
    <div aria-hidden="true" className="relative flex h-[232px] w-3 flex-col items-center justify-between">
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-hair" />
      {Array.from({ length: counterSeats }).map((_, i) => (
        <motion.span
          key={i}
          className="relative h-3 w-3 rounded-full"
          animate={{ backgroundColor: i < filled ? "var(--color-sumi)" : "var(--color-kin)" }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      ))}
    </div>
  );
}

export function Rail() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    dialogRef.current?.close();
  };

  // Keep state and scroll lock in sync however the dialog closes (Esc, button, route change).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      document.body.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Desktop rail */}
      <header className="fixed inset-y-0 left-0 z-40 hidden w-[88px] flex-col items-center justify-between border-r border-hair bg-washi py-7 lg:flex">
        <Link href="/" aria-label="KAI, home" className="t-kanji flex h-11 w-11 items-center justify-center text-[2rem] text-tokiwa">
          回
        </Link>

        <ScrollCounter />

        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="t-label flex h-24 w-full items-center justify-center [writing-mode:vertical-rl] hover:text-tokiwa"
          >
            Menu
          </button>
          <Link
            href="/reservations"
            className="t-label flex h-44 w-14 items-center justify-center bg-sumi text-washi transition-colors duration-200 [writing-mode:vertical-rl] hover:bg-tokiwa"
          >
            Reserve a Table
          </Link>
        </div>
      </header>

      {/* Mobile bar */}
      <header className="safe-top sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-hair bg-washi px-5 lg:hidden">
        <Link href="/" aria-label="KAI, home" className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/reservations"
            className="t-label inline-flex h-11 items-center bg-sumi px-4 text-washi hover:bg-tokiwa"
          >
            Reserve
          </Link>
          <button
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="t-label inline-flex h-11 items-center px-3"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Full-screen navigation */}
      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        className="on-ink fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-sumi p-0 text-washi"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeMenu();
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-5 sm:px-10 lg:pl-[calc(88px+2.5rem)]">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              className="t-label inline-flex h-11 items-center px-3 hover:text-kin"
            >
              Close
            </button>
          </div>

          <div className="mt-10 grid flex-1 gap-12 lg:mt-16 lg:grid-cols-[1.4fr_1fr]">
            <nav aria-label="Primary">
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="border-t border-mist/30 last:border-b">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "group flex items-baseline gap-5 py-4 transition-colors duration-200 sm:py-5",
                        isActive(item.href) ? "text-kin" : "hover:text-kin",
                      )}
                    >
                      <span className="t-kanji w-8 text-lg text-kin" aria-hidden="true">
                        {seatNumerals[i]}
                      </span>
                      <span className="t-h1">{item.label}</span>
                      <span className="t-kanji ml-auto hidden text-base text-mist sm:inline" aria-hidden="true">
                        {item.jp}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/reservations"
                  className="inline-flex h-[52px] items-center bg-washi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-sumi transition-colors duration-200 hover:bg-stone"
                >
                  Reserve a Table
                </Link>
              </div>
            </nav>

            <div className="self-end text-sm text-mist">
              <p className="t-label mb-3 text-kin">Visit</p>
              <p>{restaurant.address}</p>
              <p className="mt-1">
                <a className="hover:text-washi" href={`tel:${restaurant.phone.replace(/[^+\d]/g, "")}`}>
                  {restaurant.phone}
                </a>
              </p>
              <p className="mt-5">Tuesday to Sunday. One seating, 5:30 PM.</p>
              <p className="mt-5 text-xs">KAI is a fictional portfolio project.</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
