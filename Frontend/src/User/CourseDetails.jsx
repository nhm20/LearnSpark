import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SimilarCourses from "./SimilarCourses";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Invalid course ID");
      setLoading(false);
      return;
    }

    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${id}`,
          {
            timeout: 10000, // 10 second timeout
            validateStatus: (status) => status >= 200 && status < 500
          }
        );

        if (response.status === 404) {
          throw new Error("Course not found");
        }

        if (!response.data) {
          throw new Error("Invalid course data received");
        }

        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError(
          error.response?.data?.message || 
          error.message || 
          "Failed to load course details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleEnrollClick = async () => {
    if (!course) return;

    setEnrollLoading(true);
    try {
      navigate("/payment", {
        state: { course },
      });
    } catch (error) {
      console.error("Enrollment error:", error);
      setError("Failed to process enrollment. Please try again.");
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Course</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
        <p className="text-xl">No course data available</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={18} /> Back to courses
          </button>

          <div className="rounded-xl shadow-lg p-8 max-w-4xl mx-auto bg-gray-900 border border-gray-800 transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-800">
            <div className="relative h-60 w-full mb-6 rounded-lg overflow-hidden bg-gray-800">
              <img
                src={course.image || "https://via.placeholder.com/800x400"}
                alt={course.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400";
                }}
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            
            {course.description && (
              <p className="text-gray-300 mb-6">{course.description}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-400 mb-2">Class Level</h3>
                <p>{course.classLevel || "Not specified"}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-400 mb-2">Subject</h3>
                <p>{course.subject || "Not specified"}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-400 mb-2">Duration</h3>
                <p>{course.timeLimit ? `${course.timeLimit} minutes` : "Flexible"}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-400 mb-2">Price</h3>
                <p className="text-green-500 font-bold">
                  {course.price ? `$${course.price.toFixed(2)}` : "Free"}
                </p>
              </div>
            </div>
            <button
              onClick={handleEnrollClick}
              disabled={enrollLoading}
              className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 mt-6 transition-all duration-300 ease-in-out ${
                enrollLoading
                  ? "bg-green-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {enrollLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Enroll Now"
              )}
            </button>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Similar Courses</h2>
            <SimilarCourses 
              courseId={id} 
              currentSubject={course.subject} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
