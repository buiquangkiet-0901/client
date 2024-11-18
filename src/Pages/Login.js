import React from 'react';
import loginbg from '../assets/images/loginbg.webp';

function Login() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-white text-2xl font-bold mb-6">Login</h2>
        <form>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="relative mt-1">
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="block w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="block w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-2 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-500" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-gray-300 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
