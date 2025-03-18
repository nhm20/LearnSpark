import React from "react";
import TutorProfile from "./TutorProfile";
import CourseSelection from "./CourseSelection";
import TeachingHistory from "./TeachingHistory";
import Earnings from "./Earnings";
import UpcomingMeetings from "./upcomingMeetings";

const TutorDashboard = ({ tutor }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
      <TutorProfile tutor={tutor} />
      <UpcomingMeetings tutorId={tutor.id} />
      <CourseSelection
        availableUnits={["Math", "Science", "English"]}
        onSelect={(units) => console.log(units)}
      />
      <TeachingHistory tutorId={tutor.id} />
      <Earnings tutorId={tutor.id} />
    </div>
  );
};
export default TutorDashboard;
