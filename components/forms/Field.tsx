import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared form fields. A label above, a 52px control with a 1px ash bottom edge
 * (3:1 against paper, so the field is findable), and the error sentence directly
 * beneath, linked with aria-describedby. Works with React Hook Form's `register`.
 */

const control =
  "block w-full min-h-[52px] rounded-none border-0 border-b border-ash bg-stone/40 px-4 text-base text-sumi placeholder:text-ash/70 transition-colors duration-150 focus:border-sumi focus:bg-stone/60";

interface Shared {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  id: string;
  className?: string;
}

function Shell({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: Shared & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="t-label mb-2 block text-ash">
        {label}
        {optional ? <span className="ml-2 normal-case tracking-normal text-ash">(optional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ash">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...input
}: Shared & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, error && "border-ember")}
        {...input}
      />
    </Shell>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...input
}: Shared & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "py-3", error && "border-ember")}
        {...input}
      />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
  ...input
}: Shared & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">) {
  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10", error && "border-ember")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2317150F'/%3E%3C/svg%3E\")",
        }}
        {...input}
      >
        {children}
      </select>
    </Shell>
  );
}
