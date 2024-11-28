import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login"); // Default to "login"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8 && activeTab === "register") {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;

      case "confirmPassword":
        if (!value && activeTab === "register") {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      Object.keys(errors).length === 0 &&
      formData.email &&
      formData.password &&
      (activeTab === "login" || formData.confirmPassword);

    if (isValid) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a server request

      if (activeTab === "login") {
        // Simulate a login success response
        const user = { name: formData.name || "email", email: formData.email };
        localStorage.setItem("user", JSON.stringify(user));


        alert("Login successful!");

        navigate("/"); // Navigate to the home page
      } else {
        // Handle registration success
        alert("Registration successful!");
        setActiveTab("login");
      }

      setIsLoading(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-20">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02] border border-white/20">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => switchTab("register")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "register" ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-violet-50"
            }`}
          >
            <FaUserPlus />
            <span>Register</span>
          </button>
          <button
            onClick={() => switchTab("login")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "login" ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-violet-50"
            }`}
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text">
          {activeTab === "register" ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300"
            placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-white/50 backdrop-blur-sm`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-white/50 backdrop-blur-sm`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password (for Registration) */}
          {activeTab === "register" && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } bg-white/50 backdrop-blur-sm`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90"
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : activeTab === "register" ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
