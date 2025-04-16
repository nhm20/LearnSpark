import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig.jsx";
import { Google, Mail } from "@mui/icons-material";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/store.jsx";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";

const UserRegister = ({ isTutor = false }) => {
  const googleProvider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({ general: "" });
  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });
  const [showEmailForm, setShowEmailForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.general) {
      setErrors({ general: "" });
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was canceled.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const registerUserToBackend = async (backendUser) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/signup`,
        backendUser
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.error === "User already exists") {
        return { error: "User already exists" };
      }
      return { error: "Backend registration failed" };
    }
  };

  const completeSignupProcess = async (firebaseUser, name) => {
    try {
      const idToken = await firebaseUser.getIdToken();

      const backendUser = {
        name: name || firebaseUser.displayName,
        role: isTutor ? "tutor" : "user",
        idToken: idToken,
      };
      const backendResponse = await registerUserToBackend(backendUser);

      if (backendResponse?.error) {
        await firebaseUser.delete();
        setErrors({ general: backendResponse.error });
        return null;
      }

      return backendResponse;
    } catch (error) {
      if (firebaseUser) {
        await firebaseUser.delete().catch(console.error);
      }
      setErrors({ general: "Registration failed. Please try again." });
      return null;
    }
  };

  const handleEmailRegistration = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrors({ general: "All fields are required." });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ general: "Invalid email address." });
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ general: "Password should be at least 6 characters." });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ general: "Passwords do not match." });
      return;
    }

    setLoading((prev) => ({ ...prev, email: true }));

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const backendResponse = await completeSignupProcess(user, formData.name);

      if (!backendResponse) {
        return;
      }
      dispatch(
        setUser({ ...backendResponse.user, token: backendResponse.token })
      );
      navigate(isTutor ? "/tutor/dashboard" : "/");
    } catch (error) {
      setErrors({ general: handleFirebaseError(error) });
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const handleGoogleRegistration = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, google: true }));

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const backendResponse = await completeSignupProcess(user);

      if (!backendResponse) {
        return;
      }
      dispatch(
        setUser({ ...backendResponse.user, token: backendResponse.token })
      );
      navigate(isTutor ? "/tutor/dashboard" : "/");
    } catch (error) {
      setErrors({ general: handleFirebaseError(error) });
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-Montserrat font-medium text-white">
          {isTutor ? "Become a Tutor" : "Create Your Account"}
        </h2>
        <p className="text-gray-300 mt-2">
          {isTutor
            ? "Join and earn with your knowledge"
            : "Get started with your learning journey"}
        </p>
      </div>
      {showEmailForm ? (
        <form onSubmit={handleEmailRegistration} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {errors.general && (
            <div className="p-3 text-xs text-red-600 bg-black rounded-lg">
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={loading.email}
            className={`w-full p-3 rounded-lg font-medium text-white transition-colors ${
              loading.email
                ? "bg-blue-900 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading.email ? (
              <LoadingSpinner text="Registering..." />
            ) : (
              `Sign Up`
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowEmailForm(false)}
            className="w-full p-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Go Back
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleGoogleRegistration}
            disabled={loading.google}
            className={`w-full p-3 rounded-lg font-medium text-white flex items-center justify-center ${
              loading.google
                ? "bg-blue-00 cursor-not-allowed"
                : "bg-[#1207e8] hover:bg-blue-800"
            }`}
          >
            {loading.google ? (
              <LoadingSpinner text="Signing in..." />
            ) : (
              <>
                <Google className="w-5 h-5 mr-2" style={{ color: "white" }} />
                Sign Up with Google
              </>
            )}
          </button>

          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full p-3 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-100 flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-400 mt-6">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:underline font-medium"
              >
                Log in here
              </Link>
            </p>
          </div>
          <div className="text-center text-sm text-gray-400 mt-2">
            {isTutor ? (
              <p>
                Want to join as a student?{" "}
                <Link
                  to="/user-signup"
                  className="text-blue-400 hover:underline font-medium"
                >
                  Sign up here
                </Link>
              </p>
            ) : (
              <p>
                Interested in teaching?{" "}
                <Link
                  to="/tutor-signup"
                  className="text-blue-400 hover:underline font-medium"
                >
                  Become a tutor
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegister;
