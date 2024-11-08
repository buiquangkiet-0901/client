import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaUser, FaCog, FaSignOutAlt, FaHotel, FaMapMarkedAlt, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
cd import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const navigationLinks = [
    { name: "Home", icon: FaHotel, onClick: () => navigate("/") },
    { name: "Tours", icon: FaMapMarkedAlt, onClick: () => navigate("/tours") },
    { name: "About Us", icon: FaInfoCircle, onClick: () => navigate("/about") },
    { name: "Contact", icon: FaPhoneAlt, onClick: () => navigate("/contact") }
  ];

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="images.unsplash.com/photo-1564501049412-61c2a3083791"
              alt="Hotel Logo"
            />
          </div>

          <nav className="hidden md:flex space-x-6">
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            {isLoggedIn ? (
              <div className="user-dropdown relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaUser className="inline mr-2" /> Profile
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaCog className="inline mr-2" /> Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaSignOutAlt className="inline mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">Login</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.onClick}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </button>
              ))}
              {!isLoggedIn && (
                <div className="space-y-2">
                  <button className="w-full text-blue-600 hover:text-blue-800 font-medium py-2">Login</button>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
