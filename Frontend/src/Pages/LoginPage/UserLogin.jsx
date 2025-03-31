import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/store.jsx";

const UserLogin = () => {
  const provider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setError({ email: "", password: "", general: "" });
    try {
      const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user= res.user;
      dispatch(setUser({
        email: user.email,
        uid: user.uid,
        standard: 3,
        isAuthenticated: true,
        name:"XYZ",
      }));
      navigate("/");
    } catch (error) {
      setError({ ...error, general: error.message });
    } finally {
      setLoading(false);
    }
  };
  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const emailExistsMongo = await checkEmailExistsMongo(result.user.uid);
      if (emailExistsMongo) {
        setError({ ...error, email: "Email already in use", general: "" });
      }
      const user = result.user;
       dispatch(
         setUser({
           email: user.email,
           uid: user.uid,
           standard: 3,
           isAuthenticated: true,
           name: "XYZ",
         })
       );
      navigate("/");
    } catch (error) {
      setError({ ...error, general: error.message });
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
      return false;
    }
  };

  const handlePasswordReset = async () => {
    setResetError("");
    if (!resetEmail) {
      setResetError("Please enter your email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
    } catch (error) {
      setResetError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4 ">
      <div className="space-y-3">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 text-sm"
        />
        {error.email && <p className="text-red-500 text-xs">{error.email}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 text-sm"
        />
        {error.password && (
          <p className="text-red-500 text-xs">{error.password}</p>
        )}

        {error.general && (
          <p className="text-red-500 text-xs">{error.general}</p>
        )}

        <button
          onClick={handleEmailLogin}
          className="w-full p-2 rounded text-white bg-blue-600 hover:bg-blue-700 text-sm"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <button
          onClick={signUpWithGoogle}
          className="w-full p-2 rounded text-white bg-red-600 hover:bg-red-700 text-sm"
          disabled={loading}
        >
          Sign In with Google
        </button>

        <div className="pt-1">
          <p className="text-center text-xs">Forgot password?</p>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Email for reset"
            className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 text-sm mt-1"
          />
          {resetError && <p className="text-red-500 text-xs">{resetError}</p>}
          <button
            onClick={handlePasswordReset}
            className="w-full p-2 rounded text-white bg-yellow-600 hover:bg-yellow-700 text-sm mt-1"
          >
            Reset Password
          </button>
        </div>

        <p className="text-center text-xs">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
