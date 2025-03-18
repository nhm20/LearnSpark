import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ unit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${unit._id}`);
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{unit.name}</h3>
      <p className="text-sm text-gray-600">Class Level: {unit.classLevel}</p>
      <p className="text-sm text-gray-600">Subject: {unit.subject}</p>
      <p className="text-sm text-gray-600">
        Time Limit: {unit.timeLimit} minutes
      </p>
      <p className="font-semibold mt-2">Price: ${unit.price}</p>
    </div>
  );
};

export default CourseCard;
