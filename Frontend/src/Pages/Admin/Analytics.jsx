import React from "react";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stat Cards */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-300">Total Users</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">1,245</p>
        <p className="text-sm text-gray-400 mt-1">+5.2% from last month</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-300">Active Courses</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">76</p>
        <p className="text-sm text-gray-400 mt-1">+12 new courses this month</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-300">Total Tutors</h3>
        <p className="text-2xl font-bold text-blue-400 mt-2">150</p>
        <p className="text-sm text-gray-400 mt-1">+8 new tutors joined</p>
      </div>
    </div>
  );
};

export default Analytics;
