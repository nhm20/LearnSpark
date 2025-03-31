import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SimilarCourses from "../SimilarCourses";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Instructor from "./Instructor";
import Curriculum from "./Curriculum";
import Overview from "./Overview";
import CourseTabs from "./CourseTabs";
import Reviews from "./Reviews";
import CourseHero from "./CourseHero";

const CourseDetails = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

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
          `${import.meta.env.VITE_APP_SERVER_URL}/api/units/${id}`
        );

        if (!response.data) {
          console.warn("Received empty response");
          setError("Course data not available");
          return;
        }

        setCourse(response.data);
      } catch (error) {
        console.error("Fetch error:", error);

        if (error.response) {
          // Server responded with error status
          setError(
            error.response.data?.message ||
              `Server error (${error.response.status})`
          );
        } else if (error.request) {
          // Request was made but no response
          setError("Network error - please check your connection");
        } else {
          // Other setup errors
          setError("Failed to load course details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white"
        style={{
          background: "linear-gradient(to bottom right, #000000, #010626)",
        }}
      >
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-400" />
        <div className="text-xl">Loading course details...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(to bottom, #000000, #010626)",
        }}
      >
        {/* Hero Section - Full width */}
        <div
          className="w-full py-12"
          style={{
            background: "linear-gradient(to right, #000000, #010626)",
          }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="w-full lg:w-2/3 p-8">
              <CourseHero course={course} />

              {/* Course Tabs */}
              <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Tab Content */}
              <div className="mb-12 w-full">
                {activeTab === "overview" && <Overview course={course} />}

                {activeTab === "curriculum" && <Curriculum course={course} />}

                {activeTab === "instructor" && <Instructor course={course} />}

                {activeTab === "reviews" && <Reviews course={course} />}
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar course={course} setError={setError} />
          </div>
        </div>

        {/* Similar Courses Section */}
        <div
          className="w-full py-16"
          style={{
            background: "linear-gradient(to bottom, #010626, #000000)",
          }}
        >
          <div className="w-full px-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              You May Also Like
            </h2>
            <div className="text-gray-400 mb-8">
              Explore these related courses to continue your learning journey
            </div>
            <SimilarCourses courseId={id} currentSubject={course.subject} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
