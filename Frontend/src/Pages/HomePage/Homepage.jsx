import React from "react";
import { useScroll, animated, useSpring } from "@react-spring/web";
import Carousel from "./Carousel";
import Tutors from "./Tutors";
import Subjects from "./Subjects";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Homepage = () => {
  // Use the useScroll hook to track scroll position
  const { scrollYProgress } = useScroll();

  // Parallax effect using animated div with enhanced settings
  const carouselSpring = useSpring({
    transform: scrollYProgress.to((val) => `translateY(${val * 60}px)`), // Adjust multiplier for more movement
    config: { tension: 170, friction: 26 }, // Adding smoother transitions
  });

  const subjectsSpring = useSpring({
    transform: scrollYProgress.to((val) => `translateY(${val * 40}px)`), // Moderate intensity
    config: { tension: 180, friction: 20 },
  });

  const tutorsSpring = useSpring({
    transform: scrollYProgress.to((val) => `translateY(${val * 30}px)`), // Lower intensity
    config: { tension: 190, friction: 24 },
  });

  return (
    <>
      <Header />
      {/* Parallax effect for Carousel */}
      <animated.div style={carouselSpring}>
        <Carousel />
      </animated.div>

      {/* Subjects section with parallax */}
      <animated.div style={subjectsSpring}>
        <Subjects />
      </animated.div>

      {/* Tutors section with parallax */}
      <animated.div style={tutorsSpring}>
        <Tutors />
      </animated.div>

      <Footer />
    </>
  );
};

export default Homepage;
