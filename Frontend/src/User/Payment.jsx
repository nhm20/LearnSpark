import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-xl">
          No course selected. Please go back and try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    console.log("Initiating payment for:", course.name, "Price:", course.price);
    // You can integrate with a payment gateway (e.g., Stripe, PayPal) here
    alert(
      `Payment processing for ${course.name} - $${course.price.toFixed(2)}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Complete Your Enrollment</h1>
      <img
        src={
          course.image?.trim()
            ? course.image
            : "https://via.placeholder.com/600x300"
        }
        alt={course.name}
        className="w-64 h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-lg mb-2 font-semibold">Course: {course.name}</p>
      <p className="text-lg">Class Level: {course.classLevel || "N/A"}</p>
      <p className="text-lg">Subject: {course.subject || "N/A"}</p>
      <p className="text-lg">
        Time Limit: {course.timeLimit ? `${course.timeLimit} min` : "N/A"}
      </p>
      <p className="text-xl font-bold text-green-500 mt-4">
        {course.price ? `$${course.price.toFixed(2)}` : "Free"}
      </p>
      <button
        onClick={handlePayment}
        className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
