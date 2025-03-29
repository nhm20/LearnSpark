import React from "react";
import { 
  FaBook, 
  FaUserTie, 
  FaHandshake, 
  FaCreditCard, 
  FaListUl, 
  FaVideo 
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-b from-black to-[#050128]">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-blue-900/20 blur-[100px]"></div>
        <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-purple-900/20 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0C014D]/90 via-black/90 to-[#050128]/90 border border-gray-800/50">
        <div className="p-8 md:p-12 lg:p-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-Poppins mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          
          <div className="space-y-8">
            {/* First row */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 flex-1 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                    <FaBook className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Course Selection</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">Select your desired course based on your interests and goals. Browse through our wide range of topics.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 flex-1 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                    <FaUserTie className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Mentor Availability</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">Explore the availability of mentors and schedule sessions based on your preferred timings and course units.</p>
              </div>
            </div>

            {/* Second row */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 md:w-2/3 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                    <FaHandshake className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Interest-Based Matching</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">Our platform matches learners with mentors based on the courses they show interest in. Express your interest in a course and wait for mentor confirmations.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 md:w-1/3 transition-all duration-300 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-3">
                    <FaCreditCard className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Payment & Enrollment</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">After mentor confirmation, make the payment for your course units and finalize your enrollment.</p>
              </div>
            </div>

            {/* Third row */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 md:w-5/9 transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3">
                    <FaListUl className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Course Units</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">Courses are divided into various units. Choose the units that best fit your learning needs.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#0C014D]/50 to-black/50 border border-gray-800/50 rounded-xl p-6 md:w-4/9 transition-all duration-300 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 h-auto min-h-[256px] flex flex-col backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-3">
                    <FaVideo className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Interactive Classes</h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">Attend live, interactive classes with your mentor via Zoom for real-time learning.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;