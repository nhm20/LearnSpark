import React from "react";
import { Star } from "lucide-react";

const Reviews = ({ course }) => {
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Student Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border border-gray-800/50 rounded-lg p-6 w-full"
                style={{
                  background: "rgba(1, 6, 38, 0.3)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                  <div>
                    <h4 className="font-medium text-white">Student {i + 1}</h4>
                    <div className="flex items-center gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < 4
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="text-gray-300">
                  {course.reviews?.[i] ||
                    "This course completely transformed my understanding of the subject. The instructor explains complex concepts in a way that's easy to understand."}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
