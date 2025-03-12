import React from "react";
import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +1 (234) 567-890</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, index) => (
                <li
                  key={index}
                  className="hover:text-blue-400 transition duration-300 cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md bg-gray-800 text-white focus:outline-none w-48"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition">
              <Mail className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-6 flex justify-center space-x-6">
        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
          <Icon
            key={index}
            size={24}
            className="hover:text-blue-400 cursor-pointer transition"
          />
        ))}
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-4">
        © {new Date().getFullYear()} FrontEnd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
