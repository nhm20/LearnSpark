import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const TutorRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== "tutor") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default TutorRoute;
