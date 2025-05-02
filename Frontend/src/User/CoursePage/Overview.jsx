import React from "react";
import { Check } from "lucide-react";

const Overview = ({ course }) => {
  const arr = [
    "Learn the fundamentals of the subject",
    "Understand key concepts and theories",
    "Apply knowledge to real-world scenarios",
    "Develop critical thinking and problem-solving skills",
    "Gain practical experience through hands-on projects",
    "Prepare for advanced topics in the field",
  ]
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-medium text-white mb-4">
          About This Course
        </h2>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
          {arr.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-gray-400 text-lg"
            >
              <Check className="w-5 h-5 text-indigo-400 mr-2" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Overview;
