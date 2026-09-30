import { z } from "zod";
import { addDaysISO, isValidISODate, todayISO } from "@/lib/dates";
import { emailField, nameField, phoneField } from "./reservation";

export const eventTypes = [
  "Celebration",
  "Corporate dinner",
  "Intimate gathering",
  "Wedding or engagement",
  "Something else",
] as const;

export const privateDiningInquirySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  event_date: z
    .string()
    .min(1, "Please choose a date.")
    .refine(isValidISODate, "That date isn't valid.")
    .refine((v) => v > todayISO(), "Please choose a future date.")
    .refine((v) => v <= addDaysISO(todayISO(), 365), "We plan private events up to a year ahead."),
  guest_count: z
    .number({ error: "Please enter the number of guests." })
    .int("Guest count must be a whole number.")
    .min(6, "Private dining begins at 6 guests. For fewer, reserve the counter.")
    .max(24, "Our largest buyout seats 24. Tell us more in the message."),
  event_type: z.enum(eventTypes, { error: "Please choose an event type." }),
  message: z.string().trim().max(1000, "Please keep the message under 1000 characters.").optional().default(""),
});

export type PrivateDiningInquiryInput = z.output<typeof privateDiningInquirySchema>;
export type PrivateDiningInquiryFormValues = z.input<typeof privateDiningInquirySchema>;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  message: z
    .string()
    .trim()
    .min(10, "A few more words, please. At least 10 characters.")
    .max(1000, "Please keep the message under 1000 characters."),
});

export type ContactInput = z.output<typeof contactSchema>;
