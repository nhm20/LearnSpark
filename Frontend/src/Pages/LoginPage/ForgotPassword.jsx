// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Context/FireBaseConfig";

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      const firebaseErrorMap = {
        "auth/user-not-found": "No account with this email.",
        "auth/invalid-email": "Invalid email address.",
        "auth/missing-email": "Please provide an email.",
      };
      setError(firebaseErrorMap[err.code] || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Remembered your password?{" "}
          <span
            onClick={onBack}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Go back to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
