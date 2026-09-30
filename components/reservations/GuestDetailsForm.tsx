"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guestStepSchema, type GuestStepOutput, type GuestStepValues } from "@/schemas/reservation";
import { occasionOptions } from "@/data/reservations";
import { SelectField, TextAreaField, TextField } from "@/components/forms/Field";

export const GUEST_FORM_ID = "guest-details-form";

/** Step 5. Validated inline with Zod; the flow's footer button submits it via `form=`. */
export function GuestDetailsForm({
  defaultValues,
  onValid,
}: {
  defaultValues: GuestStepValues;
  onValid: (values: GuestStepOutput) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestStepValues, unknown, GuestStepOutput>({
    resolver: zodResolver(guestStepSchema),
    defaultValues,
    mode: "onTouched",
  });

  return (
    <form id={GUEST_FORM_ID} noValidate onSubmit={handleSubmit(onValid)} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <TextField
        id="customer_name"
        label="Full name"
        autoComplete="name"
        error={errors.customer_name?.message}
        className="sm:col-span-2"
        {...register("customer_name")}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        error={errors.email?.message}
        hint="We confirm by email."
        {...register("email")}
      />
      <TextField
        id="phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        hint="Used only if we need to reach you on the day."
        {...register("phone")}
      />
      <SelectField
        id="occasion"
        label="Occasion"
        optional
        error={errors.occasion?.message}
        className="sm:col-span-2"
        {...register("occasion")}
      >
        {occasionOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="special_requests"
        label="Allergies and special requests"
        optional
        hint="The menu is prepared in advance, so please tell us about allergies here."
        error={errors.special_requests?.message}
        className="sm:col-span-2"
        {...register("special_requests")}
      />
    </form>
  );
}
