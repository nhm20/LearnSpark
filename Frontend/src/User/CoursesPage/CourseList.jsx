import React from "react";
import { HiEmojiSad } from "react-icons/hi"; 
import { FaSpinner } from "react-icons/fa"; 
import CourseCard from "./CourseCard";

const CourseList = ({ filteredCourses, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-gray-800" />
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <HiEmojiSad className="text-5xl text-gray-400 mb-2" />
        <h3 className="text-lg font-medium text-black">No courses found</h3>
        <p className="mt-1 text-gray-600">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4">
      {filteredCourses.map((unit) => (
        <CourseCard key={unit._id || unit.id || unit.title} unit={unit} />
      ))}
    </div>
  );
};

export default CourseList;
