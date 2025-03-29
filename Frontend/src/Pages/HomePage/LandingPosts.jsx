import React, { useState, useEffect } from "react";

const LandingPosts = () => {
  const statements = [
    "Learn from industry experts and take your skills to the next level.",
    "Flexible, engaging, and personalized learning—designed just for you.",
    "Empower students while growing your expertise and income.",
    "Teach what you love, when you want, from anywhere.",
  ];

  const [currentStatement, setCurrentStatement] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out effect
      setIsVisible(false);

      setTimeout(() => {
        // Change text after fade-out is complete
        setCurrentStatement((prev) => (prev + 1) % statements.length);
        // Fade in effect
        setIsVisible(true);
      }, 500); // This should match the fade-out duration
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  min-h-[200px] flex items-center justify-center text-center p-5 bg-gradient-to-b from-transparent via-[#0C014D] via-40% to-black">
      {/* Animated Text */}
      <div
        className={`text-xl max-w-2xl mx-auto font-semibold text-white transition-opacity duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {statements[currentStatement]}
      </div>

      {/* Black Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </div >
  );
};

export default LandingPosts;
