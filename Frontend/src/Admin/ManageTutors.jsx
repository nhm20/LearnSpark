import React from "react";

const ManageTutors = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-white">Tutors</h2>

      {/* List of Tutors */}
      <div className="space-y-4">
        {/* Example Tutor */}
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-300">
              Sarah Miller
            </h3>
            <p className="text-sm text-gray-400">Expert in Mathematics</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Edit
            </button>
            <button className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors duration-300">
              Remove
            </button>
          </div>
        </div>

        {/* Add more tutors dynamically here */}
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-300">John Doe</h3>
            <p className="text-sm text-gray-400">Expert in Physics</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Edit
            </button>
            <button className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors duration-300">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTutors;
