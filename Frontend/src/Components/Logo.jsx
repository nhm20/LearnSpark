import { IoSparklesSharp } from "react-icons/io5";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="text-3xl md:text-5xl font-Montserrat font-normal  pr-2 whitespace-nowrap overflow-hidden animate-typing text-blue-800">
        LearnSpark
      </p>
      <style>
        {`
          @keyframes typing {
            from { 
              width: 0; 
              border-right: 4px solid #00f; // Yellow cursor
            }
            to { 
              width: 100%;
              border-right: 4px solid transparent;
            }
          }
          .animate-typing {
            display: inline-block;
            animation: typing 3s steps(10, end) forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Logo;
