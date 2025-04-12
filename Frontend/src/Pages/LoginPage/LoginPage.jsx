import React, { useState } from "react";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";
import UserLogin from "./UserLogin";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
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
          <h1 className="text-xl sm:text-2xl font-normal mb-4 text-gray-100 font-roboto">
            User Login
          </h1>
          <UserLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
