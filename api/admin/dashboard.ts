import { requireAuth } from "../_lib/auth";
import { json } from "../_lib/http";
import { getBookings, getSiteContent } from "../_lib/storage";

export async function GET(request: Request) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  const [bookings, content] = await Promise.all([getBookings(), getSiteContent()]);
  const latestBooking = bookings[0]?.createdAt ?? null;

  return json({
    stats: {
      totalBookings: bookings.length,
      totalServices: content.services.length,
      totalReviews: content.reviews.length,
      totalFaqs: content.faqs.length,
      lastBookingAt: latestBooking,
      contentUpdatedAt: content.updatedAt,
    },
    bookings,
  });
}
