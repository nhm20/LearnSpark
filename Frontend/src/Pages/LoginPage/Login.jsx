import React, { useState } from "react";
import { auth, signUpWithGoogle } from "../../Context/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      navigate("/");
      console.log("User logged in with email:", user);
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  return (
    <div className="w-1/2 flex flex-col items-center justify-center border border-gray-200 p-4">
      <h1 className="text-4xl mb-4">Login</h1>
      <input
        className="w-full block border border-gray-200 p-2 m-2 rounded-md"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="email"
      />
      <input
        className="w-full block border border-gray-200 p-2 m-2 rounded-md"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button
        className="w-full block bg-blue-600 text-white p-2 m-2 rounded-md"
        onClick={handleEmailLogin}
      >
        Login with Email
      </button>
      <button
        onClick={signUpWithGoogle}
        className="bg-blue-600 w-full text-white p-2 m-2 rounded-md"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
