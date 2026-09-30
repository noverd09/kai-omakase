import { privateDiningInquirySchema, contactSchema } from "@/schemas/inquiry";
import type { PrivateDiningInquiryRow } from "@/types/database";

/**
 * Private dining inquiries and contact messages follow the same shape as
 * reservations: form -> service -> repository -> mock, swappable for Supabase.
 * One small file keeps the pattern visible without duplicating the layering.
 */

export interface InquiryRepository {
  createInquiry(
    input: Omit<PrivateDiningInquiryRow, "id" | "status" | "created_at">,
  ): Promise<PrivateDiningInquiryRow>;
  createContactMessage(input: { name: string; email: string; message: string }): Promise<{ id: string }>;
}

const INQUIRY_KEY = "kai.inquiries.v1";
const CONTACT_KEY = "kai.contact.v1";
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function id() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function append<T>(key: string, row: T) {
  try {
    const list = JSON.parse(window.localStorage.getItem(key) ?? "[]") as T[];
    window.localStorage.setItem(key, JSON.stringify([...list, row]));
  } catch {
    /* storage blocked; the request is still acknowledged in this mock */
  }
}

class MockInquiryRepository implements InquiryRepository {
  async createInquiry(input: Omit<PrivateDiningInquiryRow, "id" | "status" | "created_at">) {
    await wait(600);
    if (new URLSearchParams(window.location.search).get("simulate") === "error") {
      throw new Error("server_error");
    }
    const row: PrivateDiningInquiryRow = {
      ...input,
      id: id(),
      status: "new",
      created_at: new Date().toISOString(),
    };
    append(INQUIRY_KEY, row);
    return row;
  }

  async createContactMessage(input: { name: string; email: string; message: string }) {
    await wait(500);
    if (new URLSearchParams(window.location.search).get("simulate") === "error") {
      throw new Error("server_error");
    }
    const row = { ...input, id: id(), created_at: new Date().toISOString() };
    append(CONTACT_KEY, row);
    return { id: row.id };
  }
}

/** Swap point for Supabase, same as `getReservationRepository`. */
const repo: InquiryRepository = new MockInquiryRepository();

export async function submitPrivateDiningInquiry(raw: unknown) {
  const input = privateDiningInquirySchema.parse(raw);
  return repo.createInquiry({
    name: input.name,
    email: input.email,
    phone: input.phone,
    event_date: input.event_date,
    guest_count: input.guest_count,
    event_type: input.event_type,
    message: input.message ? input.message : null,
  });
}

export async function submitContactMessage(raw: unknown) {
  return repo.createContactMessage(contactSchema.parse(raw));
}
