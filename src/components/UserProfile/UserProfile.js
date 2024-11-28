import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null); // Thông tin người dùng
  const [bookedHotels, setBookedHotels] = useState([]); // Danh sách khách sạn đã đặt
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const navigate = useNavigate();

  // Kiểm tra người dùng đã đăng nhập hay chưa
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // Điều hướng đến trang login nếu chưa đăng nhập
    }
  }, [navigate]);

  // Lấy danh sách khách sạn đã đặt từ API
  useEffect(() => {
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

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <FaUserCircle className="text-5xl text-indigo-600" />
          {user && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          )}
        </div>

        {/* Danh sách khách sạn đã đặt */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Booked Hotels
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading booked hotels...</p>
          ) : bookedHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={hotel.image || "https://via.placeholder.com/150"}
                    alt={hotel.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-600">{hotel.address}</p>
                    <p className="text-sm text-gray-600">
                      Check-in: {hotel.checkInDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Check-out: {hotel.checkOutDate}
                    </p>
                    <p className="text-lg font-semibold text-indigo-600 mt-2">
                      Status:{" "}
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              You have no bookings yet. Start exploring and book your next
              adventure!
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
