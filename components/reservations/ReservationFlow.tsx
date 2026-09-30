"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ReservationStepper, type StepDef } from "./ReservationStepper";
import { StepDate, StepParty, StepSeating, StepTime } from "./ReservationSteps";
import { GUEST_FORM_ID, GuestDetailsForm } from "./GuestDetailsForm";
import { ReservationSummary } from "./ReservationSummary";
import { ReservationConfirmation } from "./ReservationConfirmation";
import { createReservation } from "@/lib/reservations/service";
import { ReservationError, type Reservation } from "@/lib/reservations/types";
import type { GuestStepOutput, GuestStepValues } from "@/schemas/reservation";
import type { SeatingPreference } from "@/types/database";
import { restaurant } from "@/data/restaurant";

type StepId = "date" | "party" | "time" | "seating" | "details" | "review" | "done";

const STEPS: (StepDef & { id: StepId; title: string; help: string })[] = [
  { id: "date", label: "Date", title: "When would you like to join us?", help: "Choose an evening. KAI is open Tuesday to Sunday." },
  { id: "party", label: "Party", title: "How many guests?", help: "Tell us how many will be seated, including you." },
  { id: "time", label: "Time", title: "Choose a seating time.", help: "One seating each evening. Times shown are when you sit down." },
  { id: "seating", label: "Seating", title: "Where would you like to sit?", help: "The counter is the heart of the evening, and the one we would choose." },
  { id: "details", label: "Details", title: "Tell us who is coming.", help: "We use these only to confirm your request." },
  { id: "review", label: "Review", title: "Review your request.", help: "Check everything, then send it. You can change any line." },
  { id: "done", label: "Sent", title: "Request received", help: "" },
];

const EMPTY_GUEST: GuestStepValues = {
  customer_name: "",
  email: "",
  phone: "",
  occasion: "none",
  special_requests: "",
};

type SubmitError = { kind: "slot_taken" | "server" | "validation"; message: string } | null;

export function ReservationFlow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState("");
  const [party, setParty] = useState<number | null>(null);
  const [time, setTime] = useState("");
  const [seating, setSeating] = useState<SeatingPreference | "">("");
  const [guest, setGuest] = useState<GuestStepValues>(EMPTY_GUEST);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<SubmitError>(null);
  const [result, setResult] = useState<Reservation | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const step = STEPS[index];

  // Move focus to the step heading whenever the step changes, so keyboard and screen reader users land in context.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const go = useCallback((id: StepId) => setIndex(STEPS.findIndex((s) => s.id === id)), []);

  const canContinue: Record<StepId, boolean> = {
    date: !!date,
    party: !!party,
    time: !!time,
    seating: !!seating,
    details: true, // the form validates itself on submit
    review: true,
    done: false,
  };

  const next = () => setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const back = () => {
    setError(null);
    setIndex((i) => Math.max(i - 1, 0));
  };

  async function submit() {
    if (!party || !seating) return;
    setSubmitting(true);
    setError(null);
    try {
      const reservation = await createReservation({
        reservation_date: date,
        reservation_time: time,
        party_size: party,
        seating_preference: seating,
        ...guest,
      });
      setResult(reservation);
      go("done");
    } catch (e) {
      if (e instanceof ReservationError) {
        setError({
          kind: e.code === "slot_taken" ? "slot_taken" : e.code === "validation" ? "validation" : "server",
          message: e.message,
        });
      } else {
        setError({ kind: "server", message: "Something went wrong on our side." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setIndex(0);
    setDate("");
    setParty(null);
    setTime("");
    setSeating("");
    setGuest(EMPTY_GUEST);
    setResult(null);
    setError(null);
  }

  const summaryValues = {
    reservation_date: date,
    reservation_time: time,
    party_size: party,
    seating_preference: seating,
    ...(index >= STEPS.findIndex((s) => s.id === "review") ? guest : {}),
  };

  const motionProps = {
      initial: { opacity: 0, x: 18 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -18 },
      transition: { duration: 0.32, ease: [0.25, 1, 0.5, 1] as const },
  };

  return (
    <div>
      <ReservationStepper steps={STEPS} current={index} onNavigate={(i) => !submitting && index !== 6 && setIndex(i)} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step.id} {...motionProps}>
              {step.id === "done" && result ? (
                <ReservationConfirmation reservation={result} onNewRequest={reset} />
              ) : (
                <>
                  <h2 ref={headingRef} tabIndex={-1} className="t-h1 outline-none">
                    {step.title}
                  </h2>
                  <p className="t-lead measure mt-4 text-ash">{step.help}</p>

                  <div className="mt-10">
                    {step.id === "date" && (
                      <StepDate
                        value={date}
                        onChange={(d) => {
                          setDate(d);
                          setTime("");
                        }}
                      />
                    )}
                    {step.id === "party" && (
                      <StepParty
                        value={party}
                        onChange={(n) => {
                          setParty(n);
                          setTime("");
                        }}
                      />
                    )}
                    {step.id === "time" && party && (
                      <StepTime
                        date={date}
                        partySize={party}
                        value={time}
                        onChange={setTime}
                        onPickAnotherDate={() => go("date")}
                      />
                    )}
                    {step.id === "seating" && party && (
                      <StepSeating value={seating} partySize={party} onChange={setSeating} />
                    )}
                    {step.id === "details" && (
                      <GuestDetailsForm
                        defaultValues={guest}
                        onValid={(v: GuestStepOutput) => {
                          setGuest(v);
                          next();
                        }}
                      />
                    )}
                    {step.id === "review" && (
                      <div>
                        <ReservationSummary values={summaryValues} includeGuest onEdit={(s) => go(s as StepId)} />
                        <p className="mt-6 max-w-prose text-sm text-ash">
                          Sending this creates a <strong className="font-medium text-sumi">reservation request</strong>. Your table
                          is not held until we confirm by email. Seats are kept for 15 minutes past the reserved time.
                        </p>
                        {error ? (
                          <div role="alert" className="mt-6 border border-ember p-5 text-ember">
                            <p className="font-serif text-xl">
                              {error.kind === "slot_taken"
                                ? "That time was just taken."
                                : error.kind === "validation"
                                  ? "Some details need another look."
                                  : "We couldn't send your request."}
                            </p>
                            <p className="mt-2 text-sm">
                              {error.kind === "server"
                                ? `${error.message} Nothing was saved. Please try again, or call ${restaurant.phone}.`
                                : error.message}
                            </p>
                            {error.kind === "slot_taken" ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setTime("");
                                  go("time");
                                }}
                                className="t-label mt-4 inline-flex h-11 items-center bg-ember px-5 text-washi"
                              >
                                Choose another time
                              </button>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Footer actions. On small screens they stick to the bottom for thumb reach. */}
                  <div className="stick-bar safe-bottom sticky bottom-0 -mx-5 mt-12 flex items-center justify-between gap-4 border-t border-hair bg-washi px-5 pt-4 sm:mx-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 lg:static">
                    <button
                      type="button"
                      onClick={back}
                      disabled={index === 0 || submitting}
                      className="text-link disabled:invisible"
                    >
                      Back
                    </button>
                    {step.id === "review" ? (
                      <button
                        type="button"
                        onClick={submit}
                        disabled={submitting}
                        className="inline-flex h-[52px] min-w-48 items-center justify-center bg-sumi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-washi transition-colors hover:bg-tokiwa disabled:opacity-60"
                      >
                        {submitting ? "Sending request…" : "Send reservation request"}
                      </button>
                    ) : step.id === "details" ? (
                      <button
                        type="submit"
                        form={GUEST_FORM_ID}
                        className="inline-flex h-[52px] min-w-40 items-center justify-center bg-sumi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-washi transition-colors hover:bg-tokiwa"
                      >
                        Review request
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={next}
                        disabled={!canContinue[step.id]}
                        className="inline-flex h-[52px] min-w-40 items-center justify-center bg-sumi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-washi transition-colors hover:bg-tokiwa disabled:cursor-not-allowed disabled:bg-stone disabled:text-ash disabled:hover:bg-stone"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                  <p className="sr-only" aria-live="polite">
                    {submitting ? "Sending your request" : ""}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live summary rail, desktop only. The review step shows the full version inline. */}
        {step.id !== "done" && step.id !== "review" ? (
          <aside aria-label="Your request so far" className="hidden lg:block">
            <div className="sticky top-10 border border-hair p-6">
              <p className="t-label text-ash">Reservation request</p>
              <ReservationSummary values={summaryValues} className="mt-4 text-sm text-ash" />
              <p className="mt-6 text-xs text-ash">Not confirmed until we reply by email.</p>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
