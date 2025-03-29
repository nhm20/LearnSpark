// Reviews.js
import React from 'react';
import ReviewTicker from '../../Components/ReviewTicker/ReviewTicker';

const Reviews = () => {
  return (
    <div className="relative bg-black text-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050128] to-black opacity-95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-[#0a023b] via-transparent to-black opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-blue-600/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -right-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-blue-800/20 blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="font-OpenSans text-3xl md:text-4xl font-medium mb-4 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          What Our Clients Say
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          See what our users have to say about their learning experience
        </p>
        <ReviewTicker />
      </div>
    </div>
  );
};
export default Reviews;