import React, { useEffect, useState } from "react";
import axios from "axios";

const SimilarCourses = ({ courseId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${courseId}/similar`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching similar courses:", error);
        setError("Failed to load similar courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchSimilarCourses();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center text-white text-xl">
        No similar courses found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course._id || course.id} // Ensure unique key
          className="border border-green-400 rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
        >
          <img
            src={course.image || "https://via.placeholder.com/300"}
            alt={course.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {course.name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              {course.description || "No description available."}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-green-600">
                {course.price != null ? `$${course.price.toFixed(2)}` : "Free"}
              </p>
              <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">
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
