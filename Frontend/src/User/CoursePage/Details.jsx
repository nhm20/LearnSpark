import React from "react";

const Details = ({course}) => {
  return (
    <>
      <div
        className="border border-gray-800/50 rounded-xl p-6 w-full"
        style={{
          background: "rgba(1, 6, 38, 0.5)",
        }}
      >
        <h3 className="font-medium text-white mb-4">Course Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="text-gray-400">Subject</div>
            <div className="text-white">
              {course.subject || "Not specified"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-400">Level</div>
            <div className="text-white">
              {course.classLevel || "All Levels"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-400">Duration</div>
            <div className="text-white">
              {course.timeLimit ? `${course.timeLimit} hours` : "Self-paced"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-400">Last Updated</div>
            <div className="text-white">
              {course.updatedAt
                ? new Date(course.updatedAt).toLocaleDateString()
                : "Recently"}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-400">Language</div>
            <div className="text-white">English</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
