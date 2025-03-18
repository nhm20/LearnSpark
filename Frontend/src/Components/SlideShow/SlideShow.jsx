import React, { useEffect } from "react";
import "./SlideShow.css";
import car1 from "./car.png";
import car2 from "./car2.png";
import car3 from "./car3.png";
import car4 from "./car4.png";

const SlideShow = () => {
  useEffect(() => {
    const nextDom = document.getElementById("next");
    const prevDom = document.getElementById("prev");
    const carouselDom = document.querySelector(".carousel");
    const SliderDom = carouselDom.querySelector(".carousel .list");
    const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    const timeRunning = 3000;
    const timeAutoNext = 7000;
    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    const showSlider = (type) => {
      const SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
      const thumbnailItemsDom = document.querySelectorAll(".carousel .thumbnail .item");

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    };

    nextDom.onclick = () => showSlider("next");
    prevDom.onclick = () => showSlider("prev");

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="list">
        {[car1, car2, car3, car4].map((car, index) => (
          <div key={index} className="item">
            <img src={car} alt={`Car ${index + 1}`} />
            <div className="content">
              <div className="author">RANGE</div>
              <div className="title">ROVER</div>
              <div className="topic">CAR</div>
              <div className="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="thumbnail">
        {[car1, car2, car3, car4].map((car, index) => (
          <div key={index} className="item">
            <img src={car} alt={`Thumbnail ${index + 1}`} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="des">Description</div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev">{"<"}</button>
        <button id="next">{">"}</button>
      </div>
      <div className="time"></div>
    </div>
  );
};

export default SlideShow;