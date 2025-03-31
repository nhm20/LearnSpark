import React, { useState } from "react";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";
import UserLogin from "./UserLogin";
import TutorLogin from "./TutorLogin";

const LoginPage = () => {
  const [role, setRole] = useState(null);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute w-full inset-0 z-0">
        <VerticalTicker />
      </div>
      <div
        className="h-screen flex flex-col items-center justify-center font-poppins relative z-10"
        style={{
          background:
            "linear-gradient(rgba(10, 10, 10, 0) 0%, rgb(12, 1, 77) 40%, rgb(4, 0, 107) 60%, rgba(26, 85, 201, 0) 100%)",
        }}
      >
        <div className="border border-gray-800 p-4 sm:p-6 rounded-lg shadow-xl text-center w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-black bg-opacity-90">
          {!role ? (
            <div className="flex flex-col items-center">
              <h1 className="text-xl sm:text-2xl font-normal mb-4 text-gray-100 font-roboto">
                Login
              </h1>
              <div className="flex flex-col gap-4 w-full items-center">
                <button
                  onClick={() => setRole("user")}
                  className="px-4 py-2 font-medium rounded-md bg-blue-700 text-gray-100 hover:bg-blue-800 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4 sm:w-2/3"
                >
                  User
                </button>
                <button
                  onClick={() => setRole("tutor")}
                  className="px-4 py-2 font-medium rounded-md bg-blue-700 text-gray-100 hover:bg-blue-800 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4 sm:w-2/3"
                >
                  Tutor
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-xl sm:text-2xl font-normal mb-4 text-gray-100 font-roboto">
                {role.charAt(0).toUpperCase() + role.slice(1)} Login
              </h1>
              {role === "user" ? (
                <UserLogin onBack={() => setRole(null)} />
              ) : (
                <TutorLogin onBack={() => setRole(null)} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
