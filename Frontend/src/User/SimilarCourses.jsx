import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

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

        setCourses(response.data.slice(0, 3));
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
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No similar courses found. Explore other courses instead.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course._id || course.id}
          onClick={() => handleCourseClick(course._id || course.id)}
          className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900 hover:border-green-500 transition-all duration-300 cursor-pointer group"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={course.image || "https://via.placeholder.com/400x225"}
              alt={course.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x225";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {course.name}
            </h3>

            <div className="flex items-center mb-3">
              <p className="text-sm text-gray-400 mr-2">
                {course.subject || currentSubject || "General"}
              </p>
              <div className="w-1 h-1 bg-gray-600 rounded-full mx-2"></div>
              <p className="text-sm text-gray-400">
                {course.classLevel || "All Levels"}
              </p>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">
              {course.description || "No description available"}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-green-500">
                {course.price != null ? `$${course.price.toFixed(2)}` : "Free"}
              </p>
              <button
                onClick={(e) => handleEnrollClick(e, course)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarCourses;
