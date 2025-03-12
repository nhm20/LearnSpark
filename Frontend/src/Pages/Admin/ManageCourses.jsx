import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ className: "", subjects: [] });
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/courses/all")
      .then((response) => {
        // Ensure response is an array before setting the state
        setCourses(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleCreateCourse = () => {
    axios
      .post("/api/admin/courses/create", newCourse)
      .then((response) => {
        setCourses([...courses, response.data]);
        setNewCourse({ className: "", subjects: [] });
        setSubject("");
      })
      .catch((error) => console.error("Error creating course:", error));
  };

  const handleAddSubject = () => {
    if (subject) {
      setNewCourse({
        ...newCourse,
        subjects: [...newCourse?.subjects, subject],
      });
      setSubject("");
    }
  };

  const handleDeleteCourse = (courseId) => {
    axios
      .delete(`/api/admin/courses/delete/${courseId}`)
      .then(() => {
        setCourses(courses.filter((course) => course?._id !== courseId));
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  const handleEditCourse = (courseId) => {
    navigate(`/admin/courses/edit/${courseId}`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create New Course Section */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            Create New Course
          </h2>
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse?.className}
            onChange={(e) =>
              setNewCourse({ ...newCourse, className: e.target.value })
            }
            className="w-full mb-4 p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Add Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mb-4 p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddSubject}
            className="w-full mb-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Add Subject
          </button>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-400">Subjects:</p>
            <div className="flex flex-wrap gap-2">
              {newCourse?.subjects?.map((sub, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full text-sm"
                >
                  {sub}
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() =>
                      setNewCourse({
                        ...newCourse,
                        subjects: newCourse?.subjects?.filter((s) => s !== sub),
                      })
                    }
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleCreateCourse}
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
          >
            Create Course
          </button>
        </div>

        {/* Existing Courses Section */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">
            Existing Courses
          </h2>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course?._id}
                className="mb-6 p-4 bg-gray-700 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-medium text-gray-300">
                  {course?.className}
                </h3>
                <p className="text-sm mb-2 text-gray-400">
                  Subjects: {course?.subjects?.join(", ")}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditCourse(course?._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course?._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
