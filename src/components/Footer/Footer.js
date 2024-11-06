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
    <footer className="bg-gray-200 text-gray-700 rounded-t-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Hotel Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Luxury Hotel & Resort</h3>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="w-5 h-5 text-blue-700" />
              <p>Thu Duc, Ho Chi Minh City</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhone className="w-5 h-5 text-blue-700" />
              <p>+84 336570572</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="w-5 h-5 text-blue-700" />
              <p>ngohoangkiet789@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-blue-500 transition-colors duration-200"
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
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                aria-label="Email subscription input"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  aria-label={`Visit our ${social.label} page`}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-500">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Luxury Hotel & Resort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
