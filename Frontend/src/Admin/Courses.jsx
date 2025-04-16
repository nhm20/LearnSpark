import React from "react";
import Sidebar from "./Components/Sidebar";
import ManageCourses from "./ManageCourses";

const Courses = () => {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        background: `
        radial-gradient(ellipse at 20% 20%, rgba(12, 1, 77, 0.3) 0%, transparent 40%),
        radial-gradient(ellipse at 80% 80%, rgba(12, 1, 77, 0.2) 0%, transparent 40%),
        linear-gradient(to bottom, #000000, #07001E, #000000)
      `,
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar onTabChange={"courses"} />

      <div className="flex-1 overflow-y-auto text-white md:ml-64 transition-all duration-300">
        <ManageCourses />
      </div>
    </div>
  );
};

export default Courses;
