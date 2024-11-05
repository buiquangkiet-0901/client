import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUsers, FaStar, FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [starRating, setStarRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showGuestSelect, setShowGuestSelect] = useState(false);

  const popularDestinations = [
    "Paris, France",
    "New York, USA",
    "Tokyo, Japan",
    "London, UK",
    "Dubai, UAE"
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const filtered = popularDestinations.filter(dest =>
        dest.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!searchQuery) newErrors.search = "Please enter a destination";
    if (!checkInDate) newErrors.checkIn = "Please select check-in date";
    if (!checkOutDate) newErrors.checkOut = "Please select check-out date";
    if (checkInDate && checkOutDate && checkInDate > checkOutDate) {
      newErrors.dates = "Check-out date must be after check-in date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Search submitted:", {
        destination: searchQuery,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: { adults, children, infants },
        priceRange,
        starRating
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination Search */}
          <div className="relative">
            <div className="flex items-center border-2 rounded-lg p-3 focus-within:border-blue-500">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full outline-none"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Search destination"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                {suggestions.map((dest, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(dest);
                      setSuggestions([]);
                    }}
                  >
                    {dest}
                  </div>
                ))}
              </div>
            )}
            {errors.search && (
              <p className="text-red-500 text-sm mt-1">{errors.search}</p>
            )}
          </div>

          {/* Date Pickers */}
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <div className="border-2 rounded-lg p-3 focus-within:border-blue-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <DatePicker
                    selected={checkInDate}
                    onChange={date => setCheckInDate(date)}
                    placeholderText="Check-in"
                    className="w-full outline-none"
                    minDate={new Date()}
                    ariaLabel="Select check-in date"
                  />
                </div>
              </div>
              {errors.checkIn && (
                <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
              )}
            </div>
            <div className="relative flex-1">
              <div className="border-2 rounded-lg p-3 focus-within:border-blue-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <DatePicker
                    selected={checkOutDate}
                    onChange={date => setCheckOutDate(date)}
                    placeholderText="Check-out"
                    className="w-full outline-none"
                    minDate={checkInDate || new Date()}
                    ariaLabel="Select check-out date"
                  />
                </div>
              </div>
              {errors.checkOut && (
                <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
              )}
            </div>
          </div>

          {/* Guest Selection */}
          <div className="relative">
            <div
              className="border-2 rounded-lg p-3 cursor-pointer focus-within:border-blue-500"
              onClick={() => setShowGuestSelect(!showGuestSelect)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUsers className="text-gray-400 mr-2" />
                  <span>
                    {adults + children + infants} Guest{adults + children + infants !== 1 ? "s" : ""}
                  </span>
                </div>
                <IoMdClose
                  className={`transform transition-transform ${showGuestSelect ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {showGuestSelect && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Adults</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setAdults(adults + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Children</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setChildren(children + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Infants</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                      >
                        -
                      </button>
                      <span>{infants}</span>
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setInfants(infants + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button and Filter Toggle */}
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              className="p-3 border-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
            >
              <FaFilter className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="mt-6 p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Star Rating</h3>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={`p-2 rounded-lg ${starRating >= rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setStarRating(rating)}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {errors.dates && (
          <p className="text-red-500 text-sm mt-4">{errors.dates}</p>
        )}
      </form>
    </div>
  );
};

export default SearchBar;