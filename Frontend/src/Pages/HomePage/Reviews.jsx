import React from 'react';
import ReviewTicker from '../../Components/ReviewTicker/ReviewTicker';

const Reviews = () => {
  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">What Our Clients Say</h1>
      <p className="mb-8">See what our users have to say about their learning experience on LearnLink:</p>

      <ReviewTicker/>
    </div>
  );
}

export default Reviews;
