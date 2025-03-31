import React from "react";
import { Check } from "lucide-react";

const Overview = ({ course }) => {
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          About This Course
        </h2>
        <div className="text-gray-300 mb-6 leading-relaxed">
          {course.description || "No description available."}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          What You'll Learn
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <li key={i} className="flex items-start gap-3 w-full">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  {course.learningOutcomes?.[i] ||
                    `Key concept ${i + 1} that will enhance your skills`}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Overview;
