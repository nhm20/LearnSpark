import React, { useState } from "react";
import UserRegister from "./UserRegister";
import TutorRegister from "./TutorRegister";
import VerticalTicker from "../../Components/Ticker/VerticalTicker"; // Import the VerticalTicker component

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
      <div className="absolute w-100% inset-0 z-0">
        <VerticalTicker />
      </div>

      <div
        className="h-screen flex flex-col items-center justify-center font-poppins relative z-10"
        style={{
          background:
            "linear-gradient(rgba(10, 10, 10, 0) 0%, rgb(12, 1, 77) 40%, rgb(4, 0, 107) 60%, rgba(26, 85, 201, 0) 100%)",
        }}
      >
        <div className="border border-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl text-center w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-black bg-opacity-90">
          {!role ? (
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 text-gray-100 font-roboto tracking-tight leading-tight">
                Register
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
                {getRoleMessage()}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setRole("user")}
                  className="px-6 py-3 sm:px-8 sm:py-4 font-medium font-roboto rounded-lg shadow-md bg-blue-700 text-gray-100 hover:bg-blue-800 hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
                >
                  User
                </button>
                <button
                  onClick={() => setRole("tutor")}
                  className="px-6 py-3 sm:px-8 sm:py-4 font-medium font-roboto rounded-lg shadow-md bg-blue-700 text-gray-100 hover:bg-blue-800 hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
                >
                  Tutor
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex w-fit flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-6 text-gray-100 font-roboto tracking-tight leading-tight">
                {role.charAt(0).toUpperCase() + role.slice(1)} Registration
              </h1>
              {role === "user" ? (
                <UserRegister onBack={() => setRole(null)} />
              ) : (
                <TutorRegister onBack={() => setRole(null)} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
