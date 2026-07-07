import { requireAuth } from "../_lib/auth.js";
import { json } from "../_lib/http.js";
import { getBookings, getSiteContent, getApplications } from "../_lib/storage.js";

export async function GET(request: Request) {
  const unauthorized = requireAuth(request);
  if (unauthorized) return unauthorized;

  const [bookings, content, applications] = await Promise.all([
    getBookings(),
    getSiteContent(),
    getApplications(),
  ]);
  const latestBooking = bookings[0]?.createdAt ?? null;
  const latestApplication = applications[0]?.createdAt ?? null;

  return json({
    stats: {
      totalBookings: bookings.length,
      totalServices: content.services.length,
      totalReviews: content.reviews.length,
      totalFaqs: content.faqs.length,
      totalApplications: applications.length,
      lastBookingAt: latestBooking,
      lastApplicationAt: latestApplication,
      contentUpdatedAt: content.updatedAt,
    },
    bookings,
    applications,
  });
}
