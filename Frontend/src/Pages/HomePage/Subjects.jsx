import React, { useState, useEffect } from "react";
import axios from "axios";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch subjects from the backend when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/user/subjects`
        );
        setSubjects(response.data);
        console.log(response.data); // Log the data for debugging
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError(err.message || "Failed to load subjects"); // Use the error message from the server
        console.error(err); // Log the error for debugging
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchSubjects();
  }, []);

  // If data is loading, show a loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-white text-xl font-poppins">
          Loading subjects...
        </p>
      </div>
    );
  }

  // If there is an error, show an error message
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-roboto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10 font-poppins">
        Subjects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject._id} // Assuming 'subject' has a unique '_id'
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Subject Image */}
            <img
              src={subject.image || "https://via.placeholder.com/400x200"} // Fallback image if no image is provided
              alt={subject.name}
              className="w-full h-48 object-cover"
            />
            {/* Subject Content */}
            <div className="p-6">
              {/* Subject Name */}
              <h2 className="text-2xl font-semibold text-white font-poppins mb-2">
                {subject.name}
              </h2>
              {/* Subject Description */}
              <p className="text-gray-400 font-roboto">
                {subject.description ||
                  "An important topic to explore in this subject."}
              </p>
              {/* Call-to-Action Button */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
