import React, { useState } from "react";
import { auth } from "../../Context/FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserRegister = () => {
  const provider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    standard: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    standard: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newError = { ...error };

    if (!formData.name.trim()) {
      newError.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newError.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.standard) {
      newError.standard = "Standard is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      if (!validateForm()) {
        return;
      }

      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = res.user;
      try {
        await registerUserToMongo(formData.name, formData.standard, user.uid);
        console.log("User successfully registered in MongoDB");
        navigate("/");
      } catch (mongoError) {
        console.error("Error registering user in MongoDB:", mongoError);
        await deleteUser(user);
        console.log(
          "Firebase user deleted due to MongoDB registration failure"
        );
        setError({
          ...error,
          general: "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.code === "auth/email-already-in-use") {
        setError({ ...error, email: "Email already in use", general: "" });
      } else if (error.code === "auth/weak-password") {
        setError({
          ...error,
          password: "Password should be at least 6 characters",
          general: "",
        });
      } else {
        setError({ ...error, general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In User:", user);
      const emailExistsMongo = await checkEmailExistsMongo(user.uid).data.exists;
      if (emailExistsMongo) {
        setError({ ...error, email: "Email already in use", general: "" });
        console.log(`Email ${user.email} is already registered.`);
        return;
      }
      await registerUserToMongo(user.displayName, 1, user.uid);
      navigate("/");
    } catch (error) {
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

  const registerUserToMongo = async (name, standard, uid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/user/register`,
        { name, standard, uid }
      );
      console.log("User successfully registered in MongoDB:", response.data);
    } catch (error) {
      console.error("Error registering user to Mongo:", error.message);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center m-4 p-8 rounded-2xl shadow-xl sm:w-full md:w-8/12 lg:w-8/12 xl:w-8/12">
      <div className="space-y-6 w-full">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />

        <select
          name="standard"
          value={formData.standard}
          onChange={handleChange}
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        >
          <option value="" disabled>
            Select your standard
          </option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 3}>
              Standard {i + 3}
            </option>
          ))}
        </select>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="w-full p-5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm focus:outline-none text-xl"
        />

        {/* Display all errors at the bottom */}
        <div className="text-red-600 text-sm mt-4">
          {error.name && <div>{error.name}</div>}
          {error.email && <div>{error.email}</div>}
          {error.standard && <div>{error.standard}</div>}
          {error.password && <div>{error.password}</div>}
          {error.confirmPassword && <div>{error.confirmPassword}</div>}
          {error.general && <div>{error.general}</div>}
        </div>

        <button
          onClick={signUpWithEmail}
          className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-300 mt-6 text-xl"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as User"}
        </button>

        <button
          onClick={signUpWithGoogle}
          className="w-full px-6 py-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-300 mt-4 text-xl"
        >
          Sign Up with Google
        </button>

        <div>
          <p className="text-center text-lg mt-4">Already have an account? </p>
          <h1>
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log in here
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
