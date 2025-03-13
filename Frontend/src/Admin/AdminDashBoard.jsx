import React, { useState } from "react";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";
import ManageTutors from "./ManageTutors";
import AdminAnalytics from "./Analytics";
import Header from "../Components/Header";
const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "courses", label: "Courses" },
    { id: "users", label: "Users" },
    { id: "tutors", label: "Tutors" },
  ];

  return (
    <div className=" min-h-screen px-8 py-6">
      <Header />
      <div className="mb-8 flex space-x-6 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative pb-2 text-lg font-semibold focus:outline-none transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "dashboard" && <AdminAnalytics />}
        {activeTab === "courses" && <ManageCourses />}
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "tutors" && <ManageTutors />}
      </div>
    </div>
  );
};

export default DashBoard;
