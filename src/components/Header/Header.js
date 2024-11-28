import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Load trạng thái người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Đồng bộ trạng thái user khi localStorage thay đổi (nhiều tab)
  useEffect(() => {
    const syncUserState = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", syncUserState);
    return () => {
      window.removeEventListener("storage", syncUserState);
    };
  }, []);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Điều hướng đến trang login
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1
              className="text-2xl font-bold text-violet-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              MyApp
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/tours")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Tours
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </button>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-700">
  {user ? `Welcome, ${user.name}!` : "Please login to continue."}
</p>

                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/tours")}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Tours
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 mt-4">
                {user ? (
                  <>
                    <p className="text-sm text-gray-700">Welcome, {user.name}!</p>
                    <button
                      onClick={handleLogout}
                      className="text-sm bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
