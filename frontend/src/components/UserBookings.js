import React, { useEffect, useState } from "react";
import { cancelBooking } from "../services/api";

function UserBookings({ bookings, fetchBookings }) {
  const [message, setMessage] = useState(null);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      setMessage("Booking cancelled!");
      fetchBookings(); // Re-fetch to update list
    } catch (err) {
      setMessage("Failed to cancel: " + err.message);
    }
  };

  return (
    <div className="user-bookings-container">
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              Room: <b>{b.room}</b>, 
              From: {new Date(b.startTime).toLocaleString()},
              To: {new Date(b.endTime).toLocaleString()}
              <button className="cancel-btn" onClick={() => handleCancel(b.id)}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserBookings;
