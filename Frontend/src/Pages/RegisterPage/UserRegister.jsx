import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Constants for validation
const MIN_PASSWORD_LENGTH = 6;
const STANDARD_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 3); // Standards 3-12

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    standard: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    standard: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        return "";
      case "standard":
        return value ? "" : "Standard is required";
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
        return "";
      case "confirmPassword":
        if (!value.trim()) return "Confirm Password is required";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return { email: "Email already in use" };
      case "auth/weak-password":
        return { password: `Password should be at least ${MIN_PASSWORD_LENGTH} characters` };
      case "auth/popup-closed-by-user":
        return { general: "Google sign-in was cancelled" };
      default:
        return { general: error.message || "Registration failed. Please try again." };
    }
  };

  const registerUserToBackend = async (name, standard, uid) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/user/register`,
        { name, standard, uid }
      );
    } catch (error) {
      console.error("Backend registration error:", error);
      throw new Error("Failed to complete registration. Please try again.");
    }
  };

  const handleEmailRegistration = async () => {
    if (!validateForm()) return;

    setLoading(prev => ({ ...prev, email: true }));
    setErrors({ ...errors, general: "" });

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      try {
        await registerUserToBackend(
          formData.name,
          formData.standard,
          user.uid
        );
        navigate("/");
      } catch (backendError) {
        // Rollback Firebase user creation if backend fails
        await deleteUser(user);
        setErrors(prev => ({
          ...prev,
          general: backendError.message,
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        ...handleFirebaseError(error),
      }));
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleGoogleRegistration = async () => {
    setLoading(prev => ({ ...prev, google: true }));
    setErrors({ ...errors, general: "" });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Use form standard if selected, otherwise default to 3
      const standard = formData.standard || STANDARD_OPTIONS[0];
      
      await registerUserToBackend(
        user.displayName || formData.name || "User",
        standard,
        user.uid
      );
      
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setErrors(prev => ({
        ...prev,
        ...handleFirebaseError(error),
      }));
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="space-y-3">
        {/* Name Input */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm sm:text-base"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Standard Select */}
        <div>
          <div className="relative">
            <select
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm sm:text-base bg-black text-white appearance-none"
            >
              <option value="" disabled className="bg-black text-white">
                Select your standard
              </option>
              {STANDARD_OPTIONS.map(standard => (
                <option key={standard} value={standard} className="bg-black text-white">
                  Standard {standard}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          {errors.standard && <p className="text-red-600 text-xs mt-1">{errors.standard}</p>}
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm sm:text-base"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm sm:text-base"
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-sm sm:text-base"
          />
          {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-2 text-xs sm:text-sm text-red-600 bg-red-50 rounded-lg">
            {errors.general}
          </div>
        )}

        {/* Email Registration Button */}
        <button
          onClick={handleEmailRegistration}
          disabled={loading.email}
          className={`w-full py-2.5 rounded-lg font-medium text-white focus:outline-none transition duration-200 text-sm sm:text-base ${
            loading.email ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading.email ? "Registering..." : "Register with Email"}
        </button>

        {/* Google Registration Button */}
        <button
          onClick={handleGoogleRegistration}
          disabled={loading.google}
          className={`w-full py-2.5 rounded-lg font-medium text-white focus:outline-none transition duration-200 text-sm sm:text-base flex items-center justify-center ${
            loading.google ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading.google ? (
            "Signing in with Google..."
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign Up with Google
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center text-xs sm:text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;