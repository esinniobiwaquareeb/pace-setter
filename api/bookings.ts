import { json, readJson } from "./_lib/http.js";
import { getBookings, saveBookings } from "./_lib/storage.js";
import type { SavedBooking } from "../src/app/landing/types";

export async function POST(request: Request) {
  const booking = await readJson<SavedBooking>(request);

  // Honeypot check for bots
  if (booking.fax && booking.fax.trim() !== "") {
    console.warn("[Honeypot] Silently ignored spam booking request from:", booking.email || "unknown");
    return json({ ok: true });
  }

  const bookings = await getBookings();
  const next = [{ ...booking, createdAt: booking.createdAt || new Date().toISOString() }, ...bookings].slice(0, 200);
  await saveBookings(next);
  return json({ ok: true });
}
