import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";
import CourseCard from "../CoursesPage/CourseCard";

const SimilarCourses = ({ courseId, currentSubject }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          return;
        }

        setCourses(response.data.slice(0, 5));
      } catch (error) {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 w-full h-[300px] bg-gradient-to-b from-black via-[#020621] to-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center w-full h-[300px] bg-gradient-to-b from-black via-[#020621] to-black">
        <AlertCircle className="w-12 h-12 text-blue-400 mb-4" />
        <div className="text-blue-300 text-lg">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-blue-900/80 text-white rounded-lg hover:bg-blue-800 transition font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 text-blue-300 w-full h-[300px] flex items-center justify-center bg-gradient-to-b from-black via-[#020621] to-black">
        No similar courses found. Explore other courses instead.
      </div>
    );
  }

  return (
    <div className="w-full  relative py-12 bg-gradient-to-b from-black via-[#020621] to-black">
      <h2 className="text-2xl font-bold text-white mb-8 px-8 relative z-10">
        You might also like
      </h2>

      <div className="relative overflow-hidden w-full">
        <div className="flex overflow-x-auto pb-8 gap-6 px-8 scrollbar-hidden relative z-10">
          {courses.map((unit) => (
            <div className="flex-shrink-0 w-72" key={unit._id}>
              <CourseCard unit={unit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarCourses;
