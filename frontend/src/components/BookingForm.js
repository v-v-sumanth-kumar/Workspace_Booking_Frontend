import React, { useState } from "react";
import { createBooking } from "../services/api";

function BookingForm({ selectedRoom, rooms, onSelectRoom }) {
  const [userName, setUserName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      setMessage("Please select a room first");
      return;
    }

    if (!userName || !startTime || !endTime) {
      setMessage("Please fill all fields");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      setMessage("End time must be after start time");
      return;
    }

    try {
      const booking = {
        roomId: selectedRoom.id,
        userName,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      };
      const res = await createBooking(booking);
      setMessage("Booking successful with ID: " + res.id);
      setUserName("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      setMessage("Booking failed: " + err.message);
    }
  };

  // Inside BookingForm.js (replace your return block with this)
return (
  <div className="booking-form-container">
      <h3 className="form-header">Book a Workspace</h3>
      <form className="booking-form" onSubmit={handleSubmit}>
        <select
          className="form-input"
          value={selectedRoom ? selectedRoom.id : ""}
          onChange={(e) => {
            const room = rooms.find(r => String(r.id) === e.target.value);
            onSelectRoom(room);
          }}
        >
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
        <input
          className="form-input"
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="form-input"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className="form-input"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button className="form-btn" type="submit">Book</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
);

}
export default BookingForm;
