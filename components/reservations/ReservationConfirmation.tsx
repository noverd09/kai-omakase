"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button, TextLink } from "@/components/ui/Button";
import { ReservationSummary } from "./ReservationSummary";
import { referenceCode } from "@/lib/reservations/service";
import { seatNumerals } from "@/lib/site";
import { counterSeats, restaurant } from "@/data/restaurant";
import type { Reservation } from "@/lib/reservations/types";
import { cn } from "@/lib/cn";

/**
 * Confirmation of a *request*. The status shown is the stored status, `pending`.
 * Nothing on this screen says the table is booked, because nothing has booked it.
 */
export function ReservationConfirmation({
  reservation,
  onNewRequest,
}: {
  reservation: Reservation;
  onNewRequest: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  const seats = Math.min(reservation.party_size, counterSeats);

  return (
    <div>
      <p className="t-label inline-flex items-center gap-3 border border-hair px-3 py-2 text-ash">
        <span className="h-2 w-2 rounded-full bg-kin-deep" aria-hidden="true" />
        Reservation request · Pending confirmation
      </p>

      <h2 ref={headingRef} tabIndex={-1} className="t-h1 mt-8 outline-none">
        Your request has been received.
      </h2>
      <p className="t-lead measure mt-5 text-ash">
        Thank you, {reservation.customer_name.split(" ")[0]}. This is a request, not yet a confirmed reservation. We will
        email {reservation.email} within a day to confirm your seat.
      </p>

      <div className="mt-12 max-w-2xl border border-hair bg-stone/40 p-6 sm:p-10">
        <div className="flex items-baseline justify-between gap-6">
          <p className="font-serif text-3xl font-light tracking-[0.3em]">KAI</p>
          <p className="t-label text-ash">Japanese Omakase</p>
        </div>

        {/* The guest's seats, stamped on the counter line. */}
        <div className="mt-8" aria-hidden="true">
          <div className="relative flex h-3 items-center justify-between">
            <span className="absolute inset-x-0 top-1/2 h-px bg-hair" />
            {Array.from({ length: counterSeats }).map((_, i) => (
              <motion.span
                key={i}
                className={cn("relative h-3 w-3 rounded-full", i < seats ? "bg-sumi" : "bg-kin-deep/50")}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {Array.from({ length: counterSeats }).map((_, i) => (
              <span key={i} className={cn("t-kanji w-3 text-center text-[0.8rem]", i < seats ? "text-sumi" : "text-mist")}>
                {seatNumerals[i]}
              </span>
            ))}
          </div>
        </div>

        <ReservationSummary
          className="mt-8"
          values={{
            reservation_date: reservation.reservation_date,
            reservation_time: reservation.reservation_time,
            party_size: reservation.party_size,
            seating_preference: reservation.seating_preference,
          }}
        />

        <p className="mt-6 text-sm text-ash">
          Reference <span className="t-num font-medium text-sumi">{referenceCode(reservation.id)}</span>. Please quote it if you
          call us on {restaurant.phone}.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <h3 className="t-h3">What happens next</h3>
        <ol className="mt-4 space-y-3 text-sm text-ash">
          <li>1. We review your request against the evening&rsquo;s counter.</li>
          <li>2. You receive an email to confirm, or to suggest a nearby time.</li>
          <li>3. Once confirmed, your request becomes a reservation and the status changes.</li>
        </ol>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2">
        <Button href="/">Back to home</Button>
        <TextLink href="/menu">View the menu</TextLink>
        <button type="button" onClick={onNewRequest} className="text-link">
          Make another request
        </button>
      </div>
    </div>
  );
}
