import React from "react";

const Features = () => {
  return (
    <div className="bg-black border text-white p-8">
      <div className="flex flex-col">
        {/* First row */}
        <div className="flex w-full h-full">
          <div className="border border-gray-700 rounded-lg w-3/6 mr-4 p-4 h-64">
            <h2 className="text-xl font-semibold">Course Selection</h2>
            <p>Select your desired course based on your interests and goals. Browse through our wide range of topics.</p>
          </div>
          <div className="border border-gray-700 rounded-lg w-3/6 p-4 h-64">
            <h2 className="text-xl font-semibold">Mentor Availability</h2>
            <p>Explore the availability of mentors and schedule sessions based on your preferred timings and course units.</p>
          </div>
        </div>

        {/* Second row */}
        <div className="flex w-full h-full m-4">
          <div className="border border-gray-700 rounded-lg w-5/8 mr-4 p-4 h-64">
            <h2 className="text-xl font-semibold">Interest-Based Matching</h2>
            <p>Our platform matches learners with mentors based on the courses they show interest in. Express your interest in a course and wait for mentor confirmations.</p>
          </div>
          <div className="border border-gray-700 rounded-lg w-3/8 p-4 h-64">
            <h2 className="text-xl font-semibold">Payment & Enrollment</h2>
            <p>After mentor confirmation, make the payment for your course units and finalize your enrollment. Begin your learning journey!</p>
          </div>
        </div>

        {/* Third row */}
        <div className="flex w-full h-full m-4">
          <div className="border border-gray-700 rounded-lg w-5/9 mr-4 p-4 h-64">
            <h2 className="text-xl font-semibold">Course Units</h2>
            <p>Courses are divided into various units. Choose the units that best fit your learning needs and schedule individual sessions.</p>
          </div>
          <div className="border border-gray-700 rounded-lg w-4/9 p-4 h-64">
            <h2 className="text-xl font-semibold">Interactive Classes</h2>
            <p>Attend live, interactive classes with your mentor via Zoom, where you can ask questions, participate in discussions, and learn in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
