"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventTypes,
  privateDiningInquirySchema,
  type PrivateDiningInquiryFormValues,
  type PrivateDiningInquiryInput,
} from "@/schemas/inquiry";
import { submitPrivateDiningInquiry } from "@/lib/inquiries/service";
import { SelectField, TextAreaField, TextField } from "./Field";
import { addDaysISO, formatLongDate, todayISO } from "@/lib/dates";
import { restaurant } from "@/data/restaurant";

type Status = { kind: "idle" } | { kind: "sent"; date: string; guests: number } | { kind: "error" };

export function PrivateDiningForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PrivateDiningInquiryFormValues, unknown, PrivateDiningInquiryInput>({
    resolver: zodResolver(privateDiningInquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", event_date: "", event_type: undefined, message: "" },
  });

  const onValid = async (values: PrivateDiningInquiryInput) => {
    try {
      await submitPrivateDiningInquiry(values);
      setStatus({ kind: "sent", date: values.event_date, guests: values.guest_count });
      reset();
    } catch {
      setStatus({ kind: "error" });
    }
  };

  if (status.kind === "sent") {
    return (
      <div role="status" className="border border-hair bg-stone/40 p-8 sm:p-10">
        <p className="t-label text-ash">Inquiry · Received</p>
        <h3 className="t-h2 mt-4">Thank you. We have your inquiry.</h3>
        <p className="measure mt-4 text-ash">
          A note for {status.guests} guests on {formatLongDate(status.date)} is with our events team. This is an inquiry, not a
          booking. We reply within two business days with availability and a proposed menu.
        </p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="text-link mt-6">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" aria-busy={isSubmitting}>
      <TextField id="pd-name" label="Name" autoComplete="name" error={errors.name?.message} className="sm:col-span-2" {...register("name")} />
      <TextField id="pd-email" label="Email" type="email" inputMode="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <TextField id="pd-phone" label="Phone" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
      <TextField
        id="pd-date"
        label="Event date"
        type="date"
        min={addDaysISO(todayISO(), 1)}
        error={errors.event_date?.message}
        {...register("event_date")}
      />
      <TextField
        id="pd-guests"
        label="Guest count"
        type="number"
        inputMode="numeric"
        min={6}
        max={24}
        hint="Six to twenty-four guests."
        error={errors.guest_count?.message}
        {...register("guest_count", { valueAsNumber: true })}
      />
      <SelectField id="pd-type" label="Event type" error={errors.event_type?.message} className="sm:col-span-2" defaultValue="" {...register("event_type")}>
        <option value="" disabled>
          Choose one
        </option>
        {eventTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="pd-message"
        label="Message"
        optional
        hint="Anything that helps: the occasion, dietary needs, a preferred budget."
        error={errors.message?.message}
        className="sm:col-span-2"
        {...register("message")}
      />

      {status.kind === "error" ? (
        <div role="alert" className="border border-ember p-5 text-ember sm:col-span-2">
          <p className="font-serif text-xl">We couldn&rsquo;t send your inquiry.</p>
          <p className="mt-2 text-sm">Nothing was saved. Please try again, or write to {restaurant.email}.</p>
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[52px] min-w-48 items-center justify-center bg-sumi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-washi transition-colors hover:bg-tokiwa disabled:opacity-60"
        >
          {isSubmitting ? "Sending inquiry…" : "Send inquiry"}
        </button>
      </div>
    </form>
  );
}
