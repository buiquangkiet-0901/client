import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(storedUser)
    }
  }, []);

  if (!user) {
    return <p>Please login to see your profile.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
      <p className="text-gray-600">Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
