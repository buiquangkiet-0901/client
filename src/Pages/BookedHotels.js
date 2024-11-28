import React, { useState, useEffect } from "react";

const BookedHotels = () => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch danh sách khách sạn đã đặt từ API
    fetch("/api/booked-hotels")
      .then((response) => response.json())
      .then((data) => {
        setBookedHotels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booked hotels:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading booked hotels...</p>;
  }

  if (bookedHotels.length === 0) {
    return <p>You have no booked hotels yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Booked Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.address}</p>
            <p>
              <strong>Check-in:</strong> {hotel.checkInDate}
            </p>
            <p>
              <strong>Check-out:</strong> {hotel.checkOutDate}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  hotel.status === "Confirmed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {hotel.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedHotels;
