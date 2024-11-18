import React, { useState } from "react";

const Booking = ({ tour }) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    date: "",
    guests: 1,
  });

  const pricePerPerson = tour.price || 0;
  const serviceCharge = 10;

  const totalPrice = bookingDetails.guests * pricePerPerson + serviceCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details Submitted: ", bookingDetails);
    alert("Your booking has been submitted!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <form onSubmit={handleBookingSubmit} className="space-y-4">
        {/* Tour Title and Rating */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{tour.title}</h3>
          <p className="text-gray-500">{tour.city}</p>
          <p className="text-gray-600">${pricePerPerson} per person</p>
          <div className="flex items-center justify-center mt-2 text-blue-500">
            {/* {[...Array(5)].map((_, index) => (
              <span key={index} className={`text-lg ${index < tour.avgRating ? "text-yellow-500" : "text-gray-300"}`}>
                ★
              </span>
            ))} */}
            <span className="ml-2 text-gray-600 text-sm">({tour.reviews?.length || 0} reviews)</span>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={bookingDetails.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking Date
          </label>
          <input
            type="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            name="guests"
            value={bookingDetails.guests}
            onChange={handleInputChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Total Price */}
        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>${pricePerPerson} × {bookingDetails.guests} person(s)</span>
            <span>${bookingDetails.guests * pricePerPerson}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Charge</span>
            <span>${serviceCharge}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
