import React, { useState } from "react";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

const CommonSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState("light");

  const slides = [
    {
      title: "Luxury Hotel Experience",
      description:
        "Indulge in our premium suites with breathtaking views and world-class amenities.",
      image: "images.unsplash.com/photo-1566073771259-6a8506099945",
      price: "$299/night",
    },
    {
      title: "Beachfront Paradise",
      description:
        "Wake up to stunning ocean views and pristine beaches at your doorstep.",
      image: "images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: "$399/night",
    },
    {
      title: "Mountain Retreat",
      description:
        "Experience serenity in our mountain lodges surrounded by nature.",
      image: "images.unsplash.com/photo-1601918774946-25832a4be0d6",
      price: "$259/night",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <section
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      } transition-colors duration-300 pt-10`}
      role="region"
      aria-label="Hotel Booking Section"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <div className="relative">
            <img
              src={`https://${slides[currentSlide].image}`}
              alt={slides[currentSlide].title}
              className="w-full h-[70vh] object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945";
              }}
            />
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-center p-8 ${
                theme === "light" ? "bg-white/75" : "bg-black/75"
              }`}
            >
              <h1
                className={`text-4xl md:text-6xl font-bold mb-6 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {slides[currentSlide].title}
              </h1>
              <p
                className={`text-xl md:text-2xl mb-8 max-w-2xl ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {slides[currentSlide].description}
              </p>
              <p className="text-3xl font-bold text-blue-600 mb-8">
                {slides[currentSlide].price}
              </p>

              {/* <div className="bg-white/90 p-6 rounded-xl shadow-lg mb-8 w-full max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-200 p-2">
                    <FaCalendarAlt className="text-2xl text-blue-600" />
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Check In</p>
                      <p className="font-semibold">Select Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-200 p-2">
                    <FaBed className="text-2xl text-blue-600" />
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Rooms</p>
                      <p className="font-semibold">1 Room</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2">
                    <FaUsers className="text-2xl text-blue-600" />
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="font-semibold">2 Adults</p>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}

              <div className="flex gap-4">
                <button
                  className={`px-8 py-4 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 ${
                    theme === "light"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  aria-label="Book Now"
                >
                  Book Now
                  <FaArrowRight />
                </button>
                <button
                  onClick={toggleTheme}
                  className={`px-8 py-4 rounded-full transition-all transform hover:scale-105 ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  aria-label="Toggle Theme"
                >
                  Toggle Theme
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommonSection;
