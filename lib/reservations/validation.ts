import type { ZodError } from "zod";
import { reservationInputSchema, type ReservationInput } from "@/schemas/reservation";
import { ReservationError } from "./types";

/** Flatten a Zod error into `{ field: "first message" }` for inline display. */
export function fieldErrorsFrom(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

/** Validate a full reservation request. Throws `ReservationError("validation")`. */
export function parseReservationInput(raw: unknown): ReservationInput {
  const result = reservationInputSchema.safeParse(raw);
  if (!result.success) {
    throw new ReservationError(
      "validation",
      "Some details need another look.",
      fieldErrorsFrom(result.error),
    );
  }
  return result.data;
}

export { reservationInputSchema };
