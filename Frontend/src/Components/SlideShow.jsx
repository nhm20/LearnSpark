import React, { useState, useEffect } from "react";

const SlideShow = ({ images, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true); // Control transition

  // Extended images for seamless effect: [lastImage, ...images, firstImage]
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const autoPlay = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, interval);

    return () => clearInterval(autoPlay);
  }, [interval]);

  // Reset index when reaching the last duplicated image (without transition)
  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500); // Wait for transition to finish
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedImages.length - 2);
      }, 500);
    }
  }, [currentIndex, extendedImages.length]);

  // Restore transition after resetting index
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
