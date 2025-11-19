const BASE_URL = "https://workspace-booking-backend-6tvk.onrender.com/api";

export async function getRooms() {
  const res = await fetch(`${BASE_URL}/rooms`);
  return res.json();
}


export async function createBooking(booking) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
}

export async function getAdminAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);
  return res.json();
}

export async function cancelBooking(bookingId) {
  const res = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
    method: "DELETE"
  });
  return res.json();
}
// api.js

export async function getAllBookings() {
  const res = await fetch(`${BASE_URL}/bookings`);  // Your API endpoint returning all bookings
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}

