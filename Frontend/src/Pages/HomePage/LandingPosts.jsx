import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPosts = () => {
  const navigate = useNavigate();
  const statements = [
    "Learn from the experts and take your skills to the next level.",
    "Flexible, engaging, and personalized courses just for you.",
    "Empower students while growing your expertise and income.",
    "Teach what you love, when you want, from anywhere.",
  ];

  const [currentStatement, setCurrentStatement] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const lastScrollY = useRef(0);

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle statement rotation
  useEffect(() => {
    const rotateStatements = () => {
      setDisplayText("");
      setTypingIndex(0);
      setCurrentStatement((prev) => (prev + 1) % statements.length);
    };

    intervalRef.current = setInterval(rotateStatements, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const typeCharacter = () => {
      if (typingIndex < statements[currentStatement].length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(
            (prev) => prev + statements[currentStatement].charAt(typingIndex)
          );
          setTypingIndex((prev) => prev + 1);
        }, 100);
      }
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    typeCharacter();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typingIndex, currentStatement]);

  const handleSignup = () => {
    navigate("/tutor-signup");
  };

  const handleCourses = () => {
    navigate("/courses");
  };

  const getButtonAnimationClass = (buttonType) => {
    if (scrollDirection === "down") {
      return buttonType === "primary"
        ? "translate-x-[-20%]"
        : "translate-x-[20%]";
    } else if (scrollDirection === "up") {
      return "translate-x-0";
    }
    return "";
  };

  return (
    <div className="relative min-h-[65vh] bg-gradient-to-b from-transparent via-[#0C014D] via-40% to-black flex items-end pb-24 overflow-x-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        <div className="h-[25vh]"></div>

        <div className="min-h-[160px] mb-8 flex items-center justify-center w-full">
          <h2 className="font-OpenSans tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center px-4 w-full leading-tight md:leading-snug">
            {displayText}
          </h2>
        </div>

        <p className="text-white text-lg sm:text-xl md:text-2xl text-center mb-10 max-w-2xl mx-auto font-Montserrat px-4 leading-relaxed">
          Join thousands of learners and educators transforming their futures
          today
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <button
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-500 font-medium font-Montserrat text-base sm:text-lg ${getButtonAnimationClass(
              "primary"
            )}`}
            onClick={handleSignup}
          >
           Start Tutoring <ArrowRight className="w-5 h-5" />
          </button>

          <button
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-md transition-all duration-500 font-medium font-Montserrat text-base sm:text-lg ${getButtonAnimationClass(
              "secondary"
            )}`}
            onClick={handleCourses}
          >
            Browse Courses <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPosts;
