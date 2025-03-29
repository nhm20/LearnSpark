import React from "react";
import { Mail, Facebook, Twitter, Instagram, Linkedin, BookOpen, Users, Award, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050128] to-black opacity-95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-[#0a023b] via-transparent to-black opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-blue-600/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -right-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-blue-800/20 blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile-first grid with better spacing */}
        <div className="grid grid-cols-2 gap-8 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & About - Full width on mobile, then normal */}
          <div className="col-span-2 sm:col-span-1 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              LearnSpark
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Empowering students and teachers through personalized learning.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              {[
                { icon: Facebook, color: "hover:bg-blue-600" },
                { icon: Twitter, color: "hover:bg-sky-500" },
                { icon: Instagram, color: "hover:bg-pink-600" },
                { icon: Linkedin, color: "hover:bg-blue-700" },
              ].map(({ icon: Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-1.5 sm:p-2 rounded-full bg-gray-800 ${color} transition-all duration-300 hover:scale-110`}
                >
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 1 column on mobile */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Home", "Courses", "Mentors", "Pricing"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center text-gray-400 hover:text-white transition duration-300 group text-sm sm:text-base"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-2 sm:mr-3 transition-all group-hover:scale-125" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - 1 column on mobile */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Blog", "Help Center", "Tutorials", "Webinars"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center text-gray-400 hover:text-white transition duration-300 group text-sm sm:text-base"
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-2 sm:mr-3 transition-all group-hover:scale-125" />
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* For Teachers - Full width on mobile, then normal */}
          <div className="col-span-2 mt-4 sm:mt-0 sm:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">For Teachers</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { text: "Become Instructor", icon: BookOpen },
                { text: "Community", icon: Users },
                { text: "Certification", icon: Award },
                { text: "Flexible Hours", icon: Clock }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center text-gray-400 hover:text-white transition duration-300 group text-sm sm:text-base"
                  >
                    <item.icon 
                      size={16} 
                      className="mr-2 sm:mr-3 text-blue-400 group-hover:text-blue-300 transition-all group-hover:scale-110" 
                    />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Full width on mobile, then spans 2 columns */}
          <div className="col-span-2 mt-6 md:mt-0 md:col-span-4 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Newsletter</h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5">
              Subscribe for updates on courses and features.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Email"
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-t-md sm:rounded-l-md sm:rounded-tr-none bg-gray-800 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-5 py-2 sm:py-3 rounded-b-md sm:rounded-r-md sm:rounded-bl-none hover:opacity-90 transition-all duration-300 flex items-center justify-center group hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-sm sm:text-base">
                <Mail
                  className="mr-1 sm:mr-2 transition-transform group-hover:scale-110"
                  size={16}
                />
                <p className="font-medium">Subscribe</p>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 mt-8 sm:mt-10 mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-20 h-px top-1/2" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-3 md:space-y-0">
          <p className="text-xs sm:text-sm text-white z-10">
            © {new Date().getFullYear()} LearnSpark. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-x-4">
            {["Privacy Policy", "Terms", "Cookies"].map(
              (item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-200 hover:text-blue-400 z-10 text-xs sm:text-sm transition hover:underline hover:underline-offset-4 decoration-blue-400"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;