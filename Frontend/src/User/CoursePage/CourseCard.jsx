import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ unit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${unit._id}`);
  };

  return (
    <div
      className="bg-black border border-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-200">
            {unit.name}
          </h3>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
            {unit.classLevel}
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-400">{unit.subject}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-400">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {unit.timeLimit} minutes
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">${unit.price}</div>
          <button className="px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;