import React, { useState } from "react";
import { auth, signUpWithGoogle } from "../../Context/FireBaseConfig";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUserToMongo = async (name, uid) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/register`,
        { name, uid } // Removed email from here
      );
      console.log("User successfully registered in MongoDB:", response.data);
    } catch (error) {
      console.error("Error registering user to Mongo:", error.message);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      if (!email || !email.includes("@")) {
        throw new Error("Invalid email format");
      }
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error("Error checking email:", error.message);
      return false;
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      const flag = await checkEmailExists(email);
      if (flag) return;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Use Promise.all to save the user to both Firebase and MongoDB at the same time
      await Promise.all([
        registerUserToMongo(name, user.uid), // Only sending name and uid
      ]);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 flex flex-col items-center justify-center border border-gray-200 p-4">
      <h1 className="text-4xl mb-4">Register page</h1>
      <input
        className="w-full block border border-gray-200 p-2 m-2 rounded-md"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name"
      />
      <input
        className="w-full block border border-gray-200 p-2 m-2 rounded-md"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
      />
      <input
        className="w-full block border border-gray-200 p-2 m-2 rounded-md"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button
        onClick={signUpWithGoogle}
        className="w-full block bg-blue-600 text-white p-2 m-2 rounded-md"
      >
        Sign Up with Google
      </button>
      <button
        onClick={signUpWithEmail}
        className="w-full block bg-blue-600 text-white p-2 m-2 rounded-md"
      >
        Sign Up
      </button>
    </div>
  );
};

export default Register;
