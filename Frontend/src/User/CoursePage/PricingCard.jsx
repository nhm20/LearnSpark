import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Check, Loader2, X } from "lucide-react";
import axios from "axios";

const log = (...args) => console.log("[PricingCard]", ...args);
const logError = (...args) => console.error("[PricingCard ERROR]", ...args);

const PricingCard = ({ course }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const intervalId = setInterval(async () => {
      try {
        log("Polling for order status...");

        const { data } = await axios.get(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/payments/status/${orderId}`
        );

        const status = data.status;
        log("Received order status:", status);
        setPaymentStatus(status);

        if (status === "completed") {
          log("Payment completed, navigating to orders...");
          clearInterval(intervalId);
          navigate("/orders", {
            state: {
              paymentSuccess: true,
              orderId,
              zoomLink: data.zoomLink,
            },
          });
        }
      } catch (err) {
        logError("Polling error:", err);
        clearInterval(intervalId);
        setError(
          "Error occurred while checking payment status. Please try again."
        );
        setPaymentStatus("failed");
        setIsProcessing(false);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [orderId, navigate]);

  const handlePayment = async () => {
    if (!stripe || !elements || !course) return;

    setError(null);
    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      log("Creating payment intent for course:", course);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/payments/create-intent`,
        { course, user }
      );

      const { clientSecret, orderId: newOrderId } = data;
      log("Received clientSecret and orderId:", { clientSecret, newOrderId });

      setOrderId(newOrderId);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name || "Student",
            email: user.email,
          },
        },
      });

      if (result.error) {
        logError("Stripe error:", result.error.message);
        throw result.error;
      }

      log("Stripe confirmCardPayment result:", result);

      if (result.paymentIntent.status === "succeeded") {
        log("PaymentIntent succeeded, awaiting polling for status...");
      }
    } catch (err) {
      logError("Error occurred:", err);
      setError(err.message || "Payment failed. Please try again.");
      setPaymentStatus("failed");
      setIsProcessing(false);
    }
  };

  const isCompleted = paymentStatus === "completed";
  const isFailed = paymentStatus === "failed";
  const isLoading = isProcessing || paymentStatus === "processing";

  return (
    <div className="border  border-gray-800/50 rounded-xl overflow-hidden shadow-lg w-full bg-[rgba(1,6,38,0.5)]">
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
                onClick={() => {
                  setError(null);
                  if (isFailed) setPaymentStatus(null);
                }}
                className="float-right text-red-300 hover:text-white"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {isCompleted && (
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
              ₹ {course.originalPrice.toFixed(2)}
            </div>
          )}
        </div>

        {user?.isAuthenticated ? (
          <>
            <div className="mb-4 bg-white rounded p-4">
              <CardElement
                options={{
                  style: { base: { fontSize: "16px" } },
                  hidePostalCode: true,
                }}
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading || isCompleted}
              className={`w-full ${
                isLoading
                  ? "bg-gray-600"
                  : isCompleted
                  ? "bg-green-600"
                  : isFailed
                  ? "bg-red-600"
                  : "bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-700 hover:to-indigo-700"
              } text-white font-medium font-Montserrat py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </div>
              ) : isCompleted ? (
                "Payment Successful"
              ) : isFailed ? (
                "Try Again"
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </>
        ) : (
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-lg flex items-start gap-2">
            <div className="flex-1">Please log in to proceed with payment.</div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-800/50 p-6">
        <h4 className="font-medium text-white mb-4">This course includes:</h4>
        <ul className="space-y-3">
          <li className="text-sm text-gray-400">Course material</li>
          <li className="text-sm text-gray-400">
            Zoom session with instructor
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
