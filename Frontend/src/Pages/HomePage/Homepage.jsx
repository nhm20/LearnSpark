import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import LandingPosts from "./LandingPosts";
import Features from "./Features";
import Reviews from "./Reviews";

const Homepage = () => {
  return (
    <>
      <div className="h-screen"> {/* h-screen = height: 100vh */}
        <Header />
        <LandingPosts />
      </div>
      <Features />
      <Reviews />
      <Footer />
    </>
  );
};

export default Homepage;