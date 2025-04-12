import React, { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../Context/FireBaseConfig";
import { useSearchParams, useNavigate } from "react-router-dom";
import VerticalTicker from "../../Components/Ticker/VerticalTicker";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("✅ Password has been reset successfully.");
      setTimeout(() => {
        navigate("/login"); // 🔁 redirect to login page
      }, 2000); // 2-second delay before redirecting
    } catch (err) {
      setError("⚠️ Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute w-full inset-0 z-0">
        <VerticalTicker />
      </div>

      <div
        className="h-screen flex flex-col items-center justify-center font-poppins relative z-10"
        style={{
          background:
            "linear-gradient(rgba(10, 10, 10, 0) 0%, rgb(12, 1, 77) 40%, rgb(4, 0, 107) 60%, rgba(26, 85, 201, 0) 100%)",
        }}
      >
        <div className="border border-gray-800 p-4 sm:p-6 rounded-lg shadow-xl text-center w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-black bg-opacity-90">
          <h1 className="text-xl sm:text-2xl font-normal mb-4 text-gray-100 font-roboto">
            Reset Password
          </h1>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {error && (
              <div className="p-3 text-xs text-red-600 bg-black rounded-lg">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 text-xs text-green-600 bg-black rounded-lg">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg font-medium text-white transition-colors ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
