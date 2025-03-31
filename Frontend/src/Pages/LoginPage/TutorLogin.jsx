import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const TutorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setError({ email: "", password: "", general: "" }); // Reset errors

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/tutor/login`, {
        email: formData.email,
        password: formData.password,
      });

      const response = res.data;

      if (response.success === false) {
        // Server returned an error message
        setError({ ...error, general: response.message });
        console.error("Error during login:", response.message);
      } else if (response.success === true) {
        // Login successful, navigate to tutor dashboard
        navigate("/tutor/dashboard");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status (e.g., 400, 500)
        const serverError = error.response.data;
        setError({
          ...error,
          general: serverError.message || "An error occurred during login.",
        });
        console.error("Error during login:", serverError.message);
      } else if (error.request) {
        // No response received from the server
        setError({
          ...error,
          general: "No response from the server. Please try again later.",
        });
        console.error("Error during login: No response from server");
      } else {
        // Something went wrong in setting up the request
        setError({
          ...error,
          general: "An unexpected error occurred. Please try again.",
        });
        console.error("Error during login:", error.message);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <div className="h-full w-full flex items-center justify-center m-4 p-8 rounded-2xl shadow-xl sm:w-full md:w-8/12 lg:w-8/12 xl:w-8/12">
      <div className="space-y-6 w-full">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.email && (
          <div className="text-red-600 text-sm mt-1">{error.email}</div>
        )}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />
        {error.password && (
          <div className="text-red-600 text-sm mt-1">{error.password}</div>
        )}
        {error.general && (
          <div className="text-red-600 text-sm mt-1">{error.general}</div>
        )}

        <button
          onClick={handleEmailLogin}
          className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-300 mt-6 text-xl"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in as Tutor"}
        </button>
        <div>
          <p className="text-center text-lg mt-4">Don't have an account? </p>
          <h1>
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign up here
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
