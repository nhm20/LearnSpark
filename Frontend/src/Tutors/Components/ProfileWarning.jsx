import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileWarning = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role === "tutor") {
      const missing =
        !user?.skill?.trim() || !user?.degree || !user?.accNo?.trim() || !user?.image?.trim();

      if (missing) {
        setShowWarning(true);

        const timer = setTimeout(() => {
          navigate("/tutor/profile");
        }, 3000);

        return () => clearTimeout(timer); 
      }
    }
  }, [user, isAuthenticated, navigate]);


  if (!showWarning) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 border border-orange-600 text-white px-6 py-4 rounded-lg mt-4 shadow-md animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="font-semibold text-sm sm:text-base">
          {console.log(user)}
          Your tutor profile is incomplete. Redirecting you to complete it...
        </p>
      </div>
    </div>
  );
};

export default ProfileWarning;
