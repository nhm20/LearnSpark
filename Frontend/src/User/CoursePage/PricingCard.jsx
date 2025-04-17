import React, { useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const PricingCard = ({ course }) => {
  const user = useSelector((state) => state.user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const makePayment = async () => {
    if (!course) {
      setError("No course data available");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_APP_SERVER_URL
        }/api/orders/create-checkout-session`,
        { course, user }
      );

      if (data?.success) {
        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify({
            orderId: data.orderId,
            sessionId: data.sessionId,
          })
        );

        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }
      } else {
        throw new Error(data?.message || "Failed to create payment session");
      }
    } catch (error) {
      setError(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  const checkPaymentStatus = async (sessionId, orderId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/orders/verify-payment`,
        { params: { session_id: sessionId, order_id: orderId } }
      );

      if (data.success) {
        setSuccess(true);
        setOrderDetails(data.order);
        sessionStorage.removeItem("currentOrder");
        navigate("/orders", { state: { paymentSuccess: true } });
        return true; // Payment verified successfully
      }
      return false; // Payment not yet completed
    } catch (error) {
      console.error("Payment verification error:", error);
      return false;
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const orderId = searchParams.get("order_id");
    let intervalId;

    const startPolling = async (sessionId, orderId) => {
      // Initial check
      const isPaymentComplete = await checkPaymentStatus(sessionId, orderId);

      if (!isPaymentComplete) {
        // Set up polling if payment isn't complete yet
        intervalId = setInterval(async () => {
          const isComplete = await checkPaymentStatus(sessionId, orderId);
          if (isComplete) {
            clearInterval(intervalId);
          }
        }, 2000); // Check every 2 seconds
      }
    };

    if (sessionId && orderId) {
      startPolling(sessionId, orderId);
    } else {
      // Check for pending order in session storage
      const pendingOrder = sessionStorage.getItem("currentOrder");
      if (pendingOrder) {
        const { orderId, sessionId } = JSON.parse(pendingOrder);
        startPolling(sessionId, orderId);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [searchParams]);

  return (
    <div className="border border-gray-800/50 rounded-xl overflow-hidden shadow-lg w-full bg-[rgba(1,6,38,0.5)]">
      <div className="p-6">
        <h3 className="text-xl font-medium text-white mb-4">
          Enroll in Course
        </h3>

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

        {success && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-700 text-green-300 rounded-lg flex items-start gap-2">
            <Check className="flex-shrink-0 h-5 w-5 mt-0.5" />
            <div className="flex-1">
              Payment successful! Redirecting to orders...
            </div>
          </div>
        )}

        <div className="flex items-end gap-2 mb-6">
          <div className="text-3xl font-medium font-Poppins text-white">
            {course.price ? `₹ ${course.price.toFixed(2)}` : "Free"}
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
              disabled={isProcessing || success}
              className={`w-full ${
                isProcessing
                  ? "bg-gray-600"
                  : success
                  ? "bg-green-600"
                  : error
                  ? "bg-red-600"
                  : "bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-700 hover:to-indigo-700"
              } text-white font-medium font-Montserrat py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </div>
              ) : success ? (
                "Payment Successful"
              ) : error ? (
                "Try Again"
              ) : (
                "Proceed to Payment"
              )}
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-800/50 p-6">
        <h4 className="font-medium text-white mb-4">This course includes:</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Live Zoom sessions with tutor</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Downloadable resources</div>
          </li>
          <li className="flex items-center gap-3 text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <div>Certificate of completion</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
