import React, { useState } from "react";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";
import UserLogin from "./UserLogin";

const LoginPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute w-full inset-0 z-0">
        <VerticalTicker />
      </div>
      <div
        className="h-screen flex flex-col items-center justify-center font-poppins relative z-10 px-4"
        style={{
          background:
            "linear-gradient(rgba(10, 10, 10, 0) 0%, rgb(12, 1, 77) 40%, rgb(4, 0, 107) 60%, rgba(26, 85, 201, 0) 100%)",
        }}
      >
        <div className=" p-4 rounded-lg shadow-lg w-full max-w-sm bg-black bg-opacity-90">
          <div className="flex justify-center mb-4">
            <h1 className="text-xl sm:text-2xl font-normal text-gray-100 font-roboto">
              Login
            </h1>
          </div>
          <UserLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
