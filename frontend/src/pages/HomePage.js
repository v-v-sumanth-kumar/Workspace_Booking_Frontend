import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import UserBookings from "../components/UserBookings"; // Import UserBookings
import { getRooms, getAllBookings } from "../services/api"; // assuming getUserBookings fetches user bookings

function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getRooms().then(setRooms);
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getUserBookings().then(setBookings);
  };

  return (
    <div className="app-center-container">
      <BookingForm
        selectedRoom={selectedRoom}
        rooms={rooms}
        onSelectRoom={setSelectedRoom}
      />
      <UserBookings bookings={bookings} fetchBookings={fetchBookings} />
    </div>
  );
}

export default HomePage;
