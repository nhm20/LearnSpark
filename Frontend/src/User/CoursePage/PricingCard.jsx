import React, { useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const PricingCard = ({ course }) => {
  const user = useSelector((state) => state.user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for canceled payment on component mount
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("canceled") === "true") {
      setError("Payment was canceled. You can try again.");
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const makePayment = async () => {
    if (!course) {
      setError("No course data available");
      return;
    }

    // Reset previous error state
    setError(null);
    setIsProcessing(true);

    try {
      const stripe = await loadStripe(
        `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
      );

      const { data } = await axios.post(
        "http://localhost:8000/api/orders/create-checkout-session",
        { course },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Assuming you have user token
          },
        }
      );

      if (!data?.sessionId) {
        throw new Error("No session ID returned from server");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="border border-gray-800/50 rounded-xl overflow-hidden shadow-lg w-full"
      style={{
        background: "rgba(1, 6, 38, 0.5)",
      }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Enroll in Course</h3>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700 text-red-300 rounded-lg flex items-start gap-2">
            <X className="flex-shrink-0 h-5 w-5 mt-0.5" />
            <div className="flex-1">
              {error}
              <button
                onClick={() => setError(null)}
                className="float-right text-red-300 hover:text-white"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2 mb-6">
          <div className="text-3xl font-bold text-white">
            {course.price ? `$${course.price.toFixed(2)}` : "Free"}
          </div>
          {course.originalPrice && (
            <div className="text-lg text-gray-400 line-through">
              ${course.originalPrice.toFixed(2)}
            </div>
          )}
        </div>

        <div className="mt-8">
          {!user?.isAuthenticated ? (
            <button
              onClick={() => navigate("/login", { state: { from: "/cart" } })}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Please Login to checkout
            </button>
          ) : (
            <button
              onClick={makePayment}
              disabled={isProcessing}
              className={`w-full ${
                isProcessing || error
                  ? "bg-gray-600"
                  : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              } text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </div>
              ) : error ? (
                "Try Again"
              ) : (
                "Proceed to Payment"
              )}
            </button>
          )}
        </div>
        <div className="mt-6 text-sm text-gray-400">
          <div>30-Day Money-Back Guarantee</div>
        </div>
      </div>

      <div className="border-t border-gray-800/50 p-6">
        <h4 className="font-medium text-white mb-4">This course includes:</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>12 hours on-demand video</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>35 downloadable resources</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Full lifetime access</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Certificate of completion</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Access on mobile and TV</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
