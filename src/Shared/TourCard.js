import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BookingModal from "../components/BookingModal/BookingModal";
import { useNavigate } from "react-router-dom";

const TourCard = ({ tour }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Open booking modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = () => {
    if (tour?.id) {
      // setIsModalOpen(true);
      navigate(`/tours/${tour.id}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const nextImage = () => {
    if (tour?.images && tour.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === tour.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (tour?.images && tour.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? tour.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <img
            src={
              Array.isArray(tour?.images) && tour.images.length > 0
                ? tour.images[0]
                : "https://via.placeholder.com/150" // URL của hình ảnh dự phòng
            }
            alt={`Tour destination ${tour?.title || "Tour"}`}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />

          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 transition-all"
          >
            <BsChevronLeft className="text-xl" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/80 transition-all"
          >
            <BsChevronRight className="text-xl" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {tour?.title || "Unknown Tour"}
          </h3>
          <p className="mt-2 text-gray-600">
            {tour?.desc || "No description available."}
          </p>

          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  index < Math.floor(tour?.avgRating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              ({tour?.reviews ? tour.reviews.length : 0} reviews)
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tour?.city || "Unknown City"}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              ${tour?.price || "N/A"}
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${tour?.price || "N/A"}
            </span>
            <button
              onClick={handleBookingClick}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Details
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Display Booking Modal if isModalOpen is true */}
      <BookingModal isOpen={isModalOpen} onClose={closeModal} tour={tour} />
    </div>
  );
};

export default TourCard;
