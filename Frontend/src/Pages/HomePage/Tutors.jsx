import React from "react";

const Tutors = () => {
  // Sample data for tutors (replace with actual data from an API)
  const tutors = [
    {
      id: 1,
      name: "John Doe",
      subject: "Mathematics",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      subject: "Physics",
      rating: 4.9,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Alice Johnson",
      subject: "Chemistry",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Bob Brown",
      subject: "Biology",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-black py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10 font-poppins tracking-wide">
        Our Tutors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:scale-105"
          >
            {/* Tutor Image */}
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-56 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
            />
            {/* Tutor Details */}
            <div className="p-6 bg-gray-900 rounded-b-lg">
              {/* Tutor Name */}
              <h2 className="text-2xl font-semibold text-white font-poppins mb-2 tracking-tight">
                {tutor.name}
              </h2>
              {/* Tutor Subject */}
              <p className="text-gray-300 font-roboto mb-2">
                <span className="font-semibold">Teaches:</span> {tutor.subject}
              </p>
              {/* Tutor Rating */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-white ml-2 text-lg">{tutor.rating}</span>
              </div>
              {/* Call-to-Action Button */}
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold tracking-wide">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;
