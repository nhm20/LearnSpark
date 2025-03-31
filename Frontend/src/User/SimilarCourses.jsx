import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, Star, BookOpen, Users } from "lucide-react";

const SimilarCourses = ({ courseId, currentSubject }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarCourses = async () => {
      if (!courseId) {
        setError("No course ID provided");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/units/${courseId}/similar`,
          {
            params: { subject: currentSubject },
            timeout: 8000,
          }
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data format received");
        }

        setCourses(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching similar courses:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load similar courses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarCourses();
  }, [courseId, currentSubject]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleEnrollClick = (e, course) => {
    e.stopPropagation();
    navigate("/payment", { state: { course } });
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-12 w-full h-[300px]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #020621 50%, #000000 100%)",
        }}
      >
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center w-full h-[300px]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #020621 50%, #000000 100%)",
        }}
      >
        <AlertCircle className="w-12 h-12 text-blue-400 mb-4" />
        <div className="text-blue-300 text-lg">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-blue-900/80 text-white rounded-lg hover:bg-blue-800 transition font-medium backdrop-blur-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div
        className="text-center py-12 text-blue-300 w-full h-[300px] flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #020621 50%, #000000 100%)",
        }}
      >
        No similar courses found. Explore other courses instead.
      </div>
    );
  }

  return (
    <div
      className="w-full relative"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #020621 30%, #020621 70%, #000000 100%)",
        padding: "4rem 0",
      }}
    >
      {/* Gradient fade-in effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #000000 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0) 95%, #000000 100%)",
        }}
      ></div>

      <h2 className="text-2xl font-bold text-white mb-8 px-8 relative z-10">
        You might also like
      </h2>

      <div className="relative overflow-hidden w-full">
        <div className="flex overflow-x-auto pb-8 gap-6 px-8 scrollbar-hidden w-full relative z-10">
          {courses.map((course) => (
            <div
              key={course._id || course.id}
              onClick={() => handleCourseClick(course._id || course.id)}
              className="flex-shrink-0 w-72 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group"
              style={{
                background:
                  "linear-gradient(145deg, rgba(2,6,33,0.8) 0%, rgba(2,6,33,0.5) 100%)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={course.image || "https://via.placeholder.com/400x225"}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x225";
                  }}
                />
                <div
                  className="absolute inset-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,6,33,0.9) 0%, rgba(2,6,33,0.2) 60%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 300ms ease",
                  }}
                ></div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="px-3 py-1 text-blue-300 text-xs font-medium rounded-full"
                    style={{
                      background: "rgba(30, 58, 138, 0.3)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {course.subject || currentSubject || "General"}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <div className="ml-1 text-xs">
                      {course.rating?.toFixed(1) || "4.5"}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[3rem]">
                  {course.name}
                </h3>

                <div className="flex items-center text-xs text-blue-200/80 space-x-4">
                  <div className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1.5" />
                    <div>{course.lessons || 12} lessons</div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1.5" />
                    <div>{course.students || 150}+</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <div>
                    {course.price > 0 ? (
                      <div className="text-lg font-bold text-blue-300">
                        ${course.price.toFixed(2)}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-green-400">
                        FREE
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleEnrollClick(e, course)}
                    className="px-4 py-2 bg-blue-600/90 hover:bg-blue-700 text-white rounded-lg transition text-xs font-medium shadow-md hover:shadow-blue-500/20 backdrop-blur-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarCourses;
