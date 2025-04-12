import React from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Components/Sidebar";

const DashBoard = () => {
  return (
    <div
      className="flex flex-col md:flex-row h-screen w-full overflow-hidden"
      style={{
        background: `
      radial-gradient(ellipse at 20% 20%, rgba(12, 1, 77, 0.3) 0%, transparent 40%),
      radial-gradient(ellipse at 80% 80%, rgba(12, 1, 77, 0.2) 0%, transparent 40%),
      linear-gradient(to bottom, #000000, #07001E, #000000)
    `,
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />

      <div className="flex-1 overflow-y-auto text-white md:ml-48 px-4 md:px-6 pt-16 md:pt-6 transition-all duration-300">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashBoard;
