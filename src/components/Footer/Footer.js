import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const navigationLinks = [
    { title: "Home", href: "#" },
    { title: "Tours", href: "#" },
    { title: "About Us", href: "#" },
    { title: "Contact", href: "#" }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Hotel Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Luxury Hotel & Resort</h3>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="w-5 h-5 text-yellow-400" />
              <p>Thu Duc, Ho Chi Minh City</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="w-5 h-5 text-yellow-400" />
              <p>+84 336570572</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="w-5 h-5 text-yellow-400" />
              <p>ngohoangkiet789@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-yellow-400 transition-transform duration-300 transform hover:scale-105"
                    aria-label={`Navigate to ${link.title}`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Email subscription input"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 transform hover:rotate-6 hover:scale-110"
                  aria-label={`Visit our ${social.label} page`}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Luxury Hotel & Resort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
