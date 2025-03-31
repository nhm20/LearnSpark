import React from "react";
import { BarChart2, User, Calendar } from "lucide-react";
const Instructor = ({course}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden border-2 border-indigo-500/50">
          <img
            src={
              course.instructor?.image ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="Instructor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-2">
            {course.instructor?.name || "John Doe"}
          </h2>
          <div className="text-indigo-400 mb-4">
            {course.instructor?.title || "Senior Instructor & Industry Expert"}
          </div>
          <div className="text-gray-300 mb-4">
            {course.instructor?.bio ||
              "With over 10 years of experience in the field, our instructor has helped thousands of students master these concepts and advance their careers."}
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <div>10+ years experience</div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <div>5,000+ students</div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <div>15+ courses</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
