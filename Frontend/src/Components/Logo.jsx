import SchoolIcon from "@mui/icons-material/School";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <SchoolIcon className="text-blue-800" style={{ fontSize: 50 }} />
      <p className="text-3xl md:text-5xl font-mono border-r-4 pr-2 whitespace-nowrap overflow-hidden animate-typing">
        LearnSpark
      </p>
      <style>
        {`
          @keyframes cursor {
            50% { border-color: transparent; }
          }
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          .animate-typing {
            display: inline-block;
            animation: typing 3s steps(10, end) forwards, cursor 0.4s step-end infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default Logo;
