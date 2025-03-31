import React from "react";

const CourseHero = ({ course }) => {
  return (
    <>
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl mb-8">
        <img
          src={
            course.image ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fmath-logo&psig=AOvVaw3XS-1X0nllPx2FoZ97kHfV&ust=1743494000343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNi0hrbrs4wDFQAAAAAdAAAAABAE"
          }
          alt={course.name}
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x1080";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(1,6,38,0.3) 50%, transparent 100%)",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {course.name}
          </h1>
          <div className="text-xl text-gray-300">
            {course.shortDescription ||
              course.description?.substring(0, 120) + "..." ||
              "Comprehensive course covering all key concepts"}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHero;
