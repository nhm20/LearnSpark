import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { state } = useLocation();
  const course = state?.course;
  const [isProcessing, setIsProcessing] = useState(false);

  const makePayment = async () => {
    if (!course) {
      console.error("No course data available");
      return;
    }
    setIsProcessing(true);
    try {
      const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

      const { data } = await axios.post(
        "http://localhost:8000/api/orders/create-checkout-session",
        { course }
      );

      if (!data?.sessionId) {
        console.error("No session ID returned from server");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        console.error("Stripe error:", result.error.message);
        alert(`Payment error: ${result.error.message}`);
      }
    } catch (error) {
      console.error("Payment failed:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#01052a] to-[#0a0a2a]">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-black to-[#01052a] p-8 rounded-xl shadow-2xl border border-[#ffffff10]">
            
            <div className="mt-8">
              {!user?.isAuthenticated ? (
                <button
                  onClick={() =>
                    navigate("/login", { state: { from: "/cart" } })
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Please Login to checkout
                </button>
              ) : (
                <button
                  onClick={makePayment}
                  disabled={isProcessing}
                  className={`w-full ${
                    isProcessing
                      ? "bg-gray-600"
                      : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  } text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
