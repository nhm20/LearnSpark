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
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/store.jsx";

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
    general: "",
  });

  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    // Check if any field is empty
    const isEmpty = Object.values(formData).some((value) => !value.trim());

    if (isEmpty) {
      setErrors({ general: "All fields must be filled" });
      return false;
    }

    // Additional validations
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ general: "Invalid email format" });
      return false;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setErrors({
        general: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ general: "Passwords do not match" });
      return false;
    }
    return true;
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return { general: "Email already in use" };
      case "auth/weak-password":
        return {
          general: `Password should be at least ${MIN_PASSWORD_LENGTH} characters`,
        };
      case "auth/popup-closed-by-user":
        return { general: "Google sign-in was cancelled" };
      default:
        return {
          general: error.message || "Registration failed. Please try again.",
        };
    }
  };

  const registerUserToBackend = async (name, standard, email, uid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/user/register`,
        { name, standard, email, uid }
      );
      return response.data.user; // Return the user data from backend
    } catch (error) {
      console.error("Backend registration error:", error);
      throw new Error("Failed to complete registration. Please try again.");
    }
  };

  const handleEmailRegistration = async () => {
    if (!validateForm()) return;

    setLoading((prev) => ({ ...prev, email: true }));
    setErrors({ general: "" });

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      try {
        const userData = await registerUserToBackend(
          formData.name,
          formData.standard,
          formData.email,
          user.uid
        );

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name: formData.name,
            standard: formData.standard,
            isAuthenticated: true,
            ...userData,
          })
        );

        navigate("/");
      } catch (backendError) {
        // Rollback Firebase user creation if backend fails
        await deleteUser(user);
        setErrors((prev) => ({
          ...prev,
          general: backendError.message,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        ...handleFirebaseError(error),
      }));
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const handleGoogleRegistration = async () => {
    setLoading((prev) => ({ ...prev, google: true }));
    setErrors({ general: "" });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Use form standard if selected, otherwise default to 3
      const standard = formData.standard || STANDARD_OPTIONS[0];

      const userData = await registerUserToBackend(
        user.displayName || formData.name || "User",
        standard,
        user.email,
        user.uid
      );

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || formData.name || "User",
          standard: standard,
          isAuthenticated: true,
          ...userData,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setErrors((prev) => ({
        ...prev,
        ...handleFirebaseError(error),
      }));
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto  p-1 sm:max-w-sm">
      <div className="space-y-2 ">
        {/* Name Input */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Standard Select */}
        <div>
          <div className="relative">
            <select
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm bg-black text-white appearance-none"
            >
              <option value="" disabled className="bg-black text-white">
                Select standard
              </option>
              {STANDARD_OPTIONS.map((standard) => (
                <option
                  key={standard}
                  value={standard}
                  className="bg-black text-white"
                >
                  Standard {standard}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
              <svg
                className="fill-current h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-sm"
          />
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-2 text-xs text-red-600 bg-red-50 rounded">
            {errors.general}
          </div>
        )}

        {/* Email Registration Button */}
        <button
          onClick={handleEmailRegistration}
          disabled={loading.email}
          className={`w-full py-2 rounded font-medium text-white focus:outline-none text-sm ${
            loading.email ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading.email ? "Registering..." : "Register with Email"}
        </button>

        <button
          onClick={handleGoogleRegistration}
          disabled={loading.google}
          className={`w-full py-2 rounded font-medium text-white focus:outline-none text-sm flex items-center justify-center ${
            loading.google ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading.google ? (
            "Signing in..."
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center text-xs text-gray-600 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
