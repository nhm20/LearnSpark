import React from "react";
import { ChevronRight } from "lucide-react";

const Curriculum = ({ course }) => {
  return (
    <>
      <div className="space-y-6 w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="border border-gray-800/50 rounded-lg overflow-hidden w-full"
              style={{
                background: "rgba(1, 6, 38, 0.3)",
              }}
            >
              <button className="w-full flex justify-between items-center p-4 hover:bg-gray-900/20 transition">
                <div className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                  <div className="font-medium text-white">
                    Module {i + 1}:{" "}
                    {course.modules?.[i]?.title || `Important Topic ${i + 1}`}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {course.modules?.[i]?.lessons?.length || 4} lessons •{" "}
                  {course.modules?.[i]?.duration || "45 min"}
                </div>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Curriculum;
