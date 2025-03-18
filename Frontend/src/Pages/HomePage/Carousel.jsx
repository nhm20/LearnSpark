import React from "react";
import car from "./car.png";
import car2 from "./car2.png";
import car3 from "./car3.png";
import SlideShow from "../../Components/SlideShow/SlideShow";
const Carousel = () => {
  const images = [car, car2, car3];

  return (
    <div className="flex justify-center items-center w-full h-full">
      <SlideShow/>
    </div>
  );
};

export default Carousel;
