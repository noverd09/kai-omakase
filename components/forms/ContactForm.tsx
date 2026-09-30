"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/schemas/inquiry";
import { submitContactMessage } from "@/lib/inquiries/service";
import { TextAreaField, TextField } from "./Field";
import { restaurant } from "@/data/restaurant";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "" },
  });

  const onValid = async (values: ContactInput) => {
    try {
      await submitContactMessage(values);
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="border border-hair bg-stone/40 p-8">
        <h3 className="t-h2">Message received.</h3>
        <p className="mt-3 text-ash">Thank you. We read every note and reply within two business days.</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-link mt-4">
          Write another
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onValid)} className="grid gap-7" aria-busy={isSubmitting}>
      <TextField id="c-name" label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <TextField id="c-email" label="Email" type="email" inputMode="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <TextAreaField id="c-message" label="Message" error={errors.message?.message} {...register("message")} />
      {status === "error" ? (
        <div role="alert" className="border border-ember p-5 text-ember">
          <p className="font-serif text-xl">We couldn&rsquo;t send your message.</p>
          <p className="mt-2 text-sm">Please try again, or email {restaurant.email}.</p>
        </div>
      ) : null}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[52px] min-w-40 items-center justify-center bg-sumi px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-washi transition-colors hover:bg-tokiwa disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
