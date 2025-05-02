import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig.jsx";
import GoogleIcon from "@mui/icons-material/Google";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/store.jsx";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";
import ForgotPassword from "./ForgotPassword.jsx";

const UserLogin = () => {
  const provider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ general: "" });
  const [loading, setLoading] = useState({ login: false, google: false });
  const [resetError, setResetError] = useState("");
  const [showReset, setShowReset] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError({ general: "" });
  };

  const handleFirebaseError = (error) => {
    const code = error?.code || "";
    const messages = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Wrong password.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/network-request-failed":
        "Network error. Please check your connection.",
      "auth/internal-error": "Unexpected error. Try again.",
      "auth/popup-closed-by-user": "Google sign-in was canceled.",
      "auth/invalid-credential":
        "Invalid credentials. Please try again or use a different sign-in method.",
    };
    return messages[code] || "Something went wrong. Please try again.";
  };

  const mongodbRequest = async (idToken) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/login`,
        { idToken }
      );
      return data;
    } catch (error) {
      const message =
        error.response?.data?.error || "Unable to log in right now.";
      return { error: message };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError({ general: "Email and password required." });
      return;
    }

    setLoading((prev) => ({ ...prev, login: true }));
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const idToken = await user.getIdToken();
      const data = await mongodbRequest(idToken);
      if (data.error) {
        setError({ general: data.error });
        return;
      }

      dispatch(setUser({ ...data.user, token: data.token }));

      if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (data.user.role === "tutor") {
        navigate("/tutor/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError({ general: handleFirebaseError(err) });
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, google: true }));
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result?.user) {
        setError({ general: "Google sign-in failed." });
        return;
      }

      const idToken = await result.user.getIdToken();
      const data = await mongodbRequest(idToken);

      if (data.error) {
        setError({ general: data.error });
        return;
      }

      dispatch(setUser({ ...data.user, token: data.token }));

      if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (data.user.role === "tutor") {
        navigate("/tutor/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError({ general: handleFirebaseError(err) });
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  if (showReset) {
    return <ForgotPassword onBack={() => setShowReset(false)} />;
  }
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="grid gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {error.general && (
          <div className="p-3 text-xs text-red-600 bg-black rounded-lg">
            {error.general}
          </div>
        )}

        <button
          type="submit"
          disabled={loading.login}
          className={`w-full p-3 rounded-lg font-medium text-white transition-colors ${
            loading.login
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-[#1207e8] hover:bg-blue-700"
          }`}
        >
          {loading.login ? <LoadingSpinner text="Logging in..." /> : "Login"}
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={loading.google}
          className={`w-full p-3 rounded-lg font-medium text-gray-700  flex items-center justify-center ${
            loading.google
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-800 hover:text-white"
          }`}
        >
          {loading.google ? (
            <LoadingSpinner text="Signing in..." />
          ) : (
            <>
              <GoogleIcon className="w-5 h-5 mr-2" />
              Continue with Google
            </>
          )}
        </button>
        <p className="text-sm text-center text-gray-600 mt-2">
          Forgot your password?{"   "}
          <strong
            onClick={() => setShowReset(true)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Reset here
          </strong>
        </p>

        <div className="mt-1 text-xs text-center text-red-500">
          {resetError}
        </div>

        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/user-signup"
            className="text-blue-600 hover:underline font-medium"
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
