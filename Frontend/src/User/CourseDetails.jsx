import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SimilarCourses from "./SimilarCourses";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Handle Enroll Now button click
  const handleEnrollClick = () => {
    if (!course) return;

    // Pass the full course object to the Payment page
    navigate("/payment", {
      state: { course },
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-2xl font-bold">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
        Loading course details...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-xl">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          Retry
        </button>
      </div>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white py-8">
        {/* Course Details Section */}
        <div className="container mx-auto px-4">
          <div className="rounded-lg shadow-lg p-6 max-w-4xl mx-auto bg-gray-900 border border-gray-800">
            {/* Course Image */}
            <img
              src={course.image || "https://via.placeholder.com/600x300"}
              alt={course.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>

            {/* Course Info (Compact & Aligned) */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <p className="font-semibold">Class Level:</p>
                <p>{course.classLevel || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <p className="font-semibold">Subject:</p>
                <p>{course.subject || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <p className="font-semibold">Time Limit:</p>
                <p>{course.timeLimit ? `${course.timeLimit} min` : "N/A"}</p>
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-green-500 mt-4">
              {course.price ? `$${course.price.toFixed(2)}` : "Free"}
            </p>

            {/* Enroll Now Button */}
            <button
              onClick={handleEnrollClick}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg mt-4 hover:bg-green-700 transition duration-300"
            >
              Enroll Now
            </button>
          </div>

          {/* Similar Courses Section */}
          <div className="mt-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Similar Courses</h2>
            <SimilarCourses courseId={id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
