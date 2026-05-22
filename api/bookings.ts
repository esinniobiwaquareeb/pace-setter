import { json, readJson } from "./_lib/http";
import { getBookings, saveBookings } from "./_lib/storage";
import type { SavedBooking } from "../src/app/landing/types";

export async function POST(request: Request) {
  const booking = await readJson<SavedBooking>(request);
  const bookings = await getBookings();
  const next = [{ ...booking, createdAt: booking.createdAt || new Date().toISOString() }, ...bookings].slice(0, 200);
  await saveBookings(next);
  return json({ ok: true });
}
