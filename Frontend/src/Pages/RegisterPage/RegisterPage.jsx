import React, { useState } from "react";
import UserRegister from "./UserRegister";
import TutorRegister from "./TutorRegister";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";

const RegisterPage = () => {
  const [role, setRole] = useState(null);

  const getRoleMessage = () => {
    switch (role) {
      case "user":
        return "As a user, you can explore courses, select tutors, and engage in personalized learning experiences.";
      case "tutor":
        return "As a tutor, you can offer your expertise, conduct live sessions, and guide students on their learning journey.";
      default:
        return "Please select your role to proceed with registration.";
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Ticker */}
      <div className="absolute w-full inset-0 z-0">
        <VerticalTicker />
      </div>

      {/* Main Content */}
      <div
        className="h-screen flex flex-col items-center justify-center font-poppins relative z-10"
        style={{
          background:
            "linear-gradient(rgba(10, 10, 10, 0) 0%, rgb(12, 1, 77) 40%, rgb(4, 0, 107) 60%, rgba(26, 85, 201, 0) 100%)",
        }}
      >
        {/* Form Container */}
        <div className="border border-white-800 max-h-[100vh] overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-black bg-opacity-90">
          {!role ? (
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 text-gray-100 font-roboto tracking-tight leading-tight">
                Register
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
                {getRoleMessage()}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button
                  onClick={() => setRole("user")}
                  className="px-6 py-3 sm:px-8 sm:py-4 font-medium font-roboto rounded-lg shadow-md bg-blue-700 text-gray-100 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Register as User
                </button>
                <button
                  onClick={() => setRole("tutor")}
                  className="px-6 py-3 sm:px-8 sm:py-4 font-medium font-roboto rounded-lg shadow-md bg-blue-700 text-gray-100 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Register as Tutor
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Back button aligned left */}
              <button
                onClick={() => setRole(null)}
                className="flex items-center text-blue-400 hover:text-blue-300 mb-6 text-sm"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Back to role selection
              </button>
              
              {/* Centered content */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 text-gray-100 font-roboto tracking-tight leading-tight">
                  {role.charAt(0).toUpperCase() + role.slice(1)} Registration
                </h2>
              </div>
              
              <div className="flex justify-center">
                {role === "user" ? <UserRegister /> : <TutorRegister />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;