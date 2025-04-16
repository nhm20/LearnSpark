import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineClockCircle,
  AiOutlineStar,
} from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";

const CourseCard = ({ unit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${unit._id}`);
  };

  return (
    <div
      className="relative bg-black border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-gray-600 hover:translate-y-[-4px]"
      onClick={handleClick}
    >
      {unit.isFeatured && (
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white z-10 flex items-center">
          <AiOutlineStar className="mr-1" /> Featured
        </div>
      )}

      <div className="relative">
        {unit.image && (
          <img
            src={unit.image}
            alt={unit.name}
            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold font-OpenSans text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            {unit.name}
          </h3>
          <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 ml-2 whitespace-nowrap">
            {unit.classLevel}
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-1">{unit.subject}</p>

        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center text-yellow-400 mr-3">
            <AiOutlineStar className="mr-1" />
            <p className="text-xs font-medium">{unit.rating || "4.8"}</p>
          </div>
          <p className="text-xs text-gray-500">
            {unit.enrollmentCount
              ? `${unit.enrollmentCount} students`
              : "100+ students"}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center">
            <AiOutlineClockCircle className="mr-2 h-4 w-4 text-gray-500" />
            <p>{unit.timeLimit} hours total</p>
          </div>
          {unit.completionBadge && (
            <div className="flex items-center">
              <BsCheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <p>Completion certificate</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-xl font-medium font-Poppins text-white">
              ₹  {unit.price}
            </p>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
