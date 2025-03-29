import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ filteredCourses, loading }) => {
  if (loading) {
    return <p>Loading units...</p>;
  }

  if (filteredCourses.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">No courses found.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((unit, index) => (
        <CourseCard key={index} unit={unit} />
      ))}
    </div>
  );
};

export default CourseList;
