import React from "react";
import UserRegister from "./UserRegister";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";
import { useLocation } from "react-router-dom";

const RegisterPage = () => {
  const location = useLocation();
  const isTutorSignup = location.pathname === "/tutor-signup";

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
        <div className="border border-white-800 p-4 rounded-lg shadow-lg w-full max-w-sm bg-black bg-opacity-90">
          <div className="flex justify-center">
            <UserRegister isTutor={isTutorSignup} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
