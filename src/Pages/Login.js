import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const commonDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"];
  const [suggestions, setSuggestions] = useState([]);
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email" && !value.includes("@")) {
      setSuggestions(
        commonDomains.map((domain) => value + domain)
      );
    } else {
      setSuggestions([]);
    }

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
    const isValid = Object.keys(errors).length === 0 && 
                    formData.email && 
                    formData.password && 
                    (activeTab === "login" || formData.confirmPassword);

    if (isValid) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      alert(activeTab === "register" ? "Registration successful!" : "Login successful!");

      navigate("/home");
    }
  };

  const selectSuggestion = (suggestion) => {
    setFormData({ ...formData, email: suggestion });
    setSuggestions([]);
    validateField("email", suggestion);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-20">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02] border border-white/20">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => switchTab("register")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
              ${activeTab === "register" ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-violet-50"}`}
          >
            <FaUserPlus />
            <span>Register</span>
          </button>
          <button
            onClick={() => switchTab("login")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
              ${activeTab === "login" ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-violet-50"}`}
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text">
          {activeTab === "register" ? "Create Account" : "Welcome Back"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${errors.email ? "border-red-500" : "border-gray-300"} bg-white/50 backdrop-blur-sm`}
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
              autoComplete="email"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl mt-1 shadow-xl">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-violet-50 cursor-pointer transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    onClick={() => selectSuggestion(suggestion)}
                    onChange={handleInputChange}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${errors.password ? "border-red-500" : "border-gray-300"} bg-white/50 backdrop-blur-sm`}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="password-error"
                autoComplete={activeTab === "register" ? "new-password" : "current-password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600 focus:outline-none transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" id="password-error" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {activeTab === "register" && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all duration-300 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} bg-white/50 backdrop-blur-sm`}
                  placeholder="Confirm your password"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby="confirm-password-error"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-600 focus:outline-none transition-colors duration-200"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600" id="confirm-password-error" role="alert">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 focus:ring-4 focus:ring-violet-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              activeTab === "register" ? "Register" : "Login"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {activeTab === "register" ? (
              <>
                Already have an account?{" "}
                <button 
                  type="button" 
                  onClick={() => switchTab("login")} 
                  className="text-violet-600 hover:text-fuchsia-600 font-medium focus:outline-none focus:underline transition-colors duration-200"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button 
                  type="button" 
                  onClick={() => switchTab("register")} 
                  className="text-violet-600 hover:text-fuchsia-600 font-medium focus:outline-none focus:underline transition-colors duration-200"
              
                >
                  Register
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;