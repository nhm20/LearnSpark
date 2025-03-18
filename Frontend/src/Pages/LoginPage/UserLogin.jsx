import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig"; // Ensure provider is imported
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth"; // Add sendPasswordResetEmail
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
  const provider = new GoogleAuthProvider();
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
  const [resetEmail, setResetEmail] = useState(""); // Add state for email in reset process
  const [resetError, setResetError] = useState(""); // Add state for reset errors
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
    setError({ email: "", password: "", general: "" });

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = res.user;
      navigate("/");
      console.log("User logged in with email:", user);
    } catch (error) {
      setError({ ...error, general: error.message });
      console.error("Error during login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In User:", user);
      const emailExistsMongo = await checkEmailExistsMongo(user.uid);
      if (emailExistsMongo) {
        setError({ ...error, email: "Email already in use", general: "" });
        console.log(`Email ${user.email} is already registered.`);
        navigate("/");
      }
    } catch (error) {
      setError({ ...error, general: error.message });
      console.error("Error during Google Sign-In popup:", error.message);
    }
  };

  const checkEmailExistsMongo = async (email) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/user/exists`,
        { email }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email in Mongo:", error.message);
      return false;
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    setResetError(""); // Reset any previous errors
    if (!resetEmail) {
      setResetError("Please enter your email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setResetError(error.message);
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
          {loading ? "Logging in..." : "Log in as User"}
        </button>

        <button
          onClick={signUpWithGoogle}
          className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-300 mt-4 text-xl"
          disabled={loading}
        >
          Sign In with Google
        </button>

        {/* Password Reset Section */}
        <div>
          <p className="text-center text-lg mt-4">Forgot your password?</p>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Enter your email for reset"
            className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl mt-2"
          />
          {resetError && (
            <div className="text-red-600 text-sm mt-1">{resetError}</div>
          )}
          <button
            onClick={handlePasswordReset}
            className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none transition duration-300 mt-4 text-xl"
          >
            Reset Password
          </button>
        </div>

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

export default UserLogin;
