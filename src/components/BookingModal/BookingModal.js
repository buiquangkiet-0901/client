import React, { useEffect, useState } from 'react';

const BookingModal = ({ isOpen, onClose, tour }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg w-full max-w-md p-6 relative transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-xl">
          &times;
        </button>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">{tour.title}</h3>
          <p className="text-sm text-gray-600">{tour.city}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of People</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="text-right">
          <button
            onClick={() => {
              alert('Booking confirmed!');
              onClose();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
