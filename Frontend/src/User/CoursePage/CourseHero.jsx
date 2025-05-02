import React from "react";

const CourseHero = ({ course }) => {
  return (
    <>
      <div className="relative  w-full h-auto max-h-[30vh] sm:max-h-[40vh] md:max-h-[50vh] rounded-xl overflow-hidden shadow-2xl mb-4 bg-black">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-contain"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(1,6,38,0.3) 50%, transparent 100%)",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-2">
            {course.name}
          </h1>
        </div>
      </div>
    </>
  );
};

export default CourseHero;
