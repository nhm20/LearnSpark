import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CoursePayment = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  // Hardcoded cart for testing
  const cart = [{ id: 1, name: "Test Course 1", price: 99 }];

  const totalPrice = () =>
    cart.reduce((acc, item) => acc + (item.price || 0), 0);

  // Get payment gateway token
  const getToken = async () => {
    try {
      setTokenLoading(true);
      const { data } = await axios.get(
        "http://localhost:8000/api/orders/braintree/token"
      );
      setClientToken(data?.clientToken);
      setPaymentStatus("Payment gateway ready");
    } catch (error) {
      console.error("Error fetching token:", error);
      setPaymentStatus("Failed to initialize payment gateway");
    } finally {
      setTokenLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Handle payment
  const handlePayment = async () => {
    try {
      if (!instance) {
        setPaymentStatus("Payment gateway not ready");
        return;
      }

      setLoading(true);
      setPaymentStatus("Processing payment...");

      // Get payment method nonce
      const { nonce } = await instance.requestPaymentMethod();

      // Validate cart data
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        throw new Error("Invalid cart data");
      }

      // Send to backend
      const { data } = await axios.post(
        "http://localhost:8000/api/orders/braintree/payment",
        {
          nonce,
          cart: cart.map((item) => ({
            name: item.name,
            price: parseFloat(item.price),
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setPaymentStatus("Payment successful! Redirecting...");
        setTimeout(() => navigate("/success"), 2000);
      } else {
        throw new Error(data.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary text-white text-center py-4">
              <h3 className="text-xl font-semibold">Test Payment</h3>
            </div>
            <div className="px-6 py-4">
              <h5 className="text-lg font-medium mb-4">Order Summary</h5>
              <ul className="list-none space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold mt-4">
                <h6>Total:</h6>
                <h6>${totalPrice().toFixed(2)}</h6>
              </div>

              <div className="mt-6">
                {tokenLoading ? (
                  <div className="bg-blue-100 text-blue-700 p-4 rounded-lg text-center">
                    Loading payment gateway...
                  </div>
                ) : clientToken ? (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                ) : (
                  <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                    Failed to load payment gateway
                  </div>
                )}
              </div>

              {paymentStatus && (
                <div
                  className={`mt-4 p-4 rounded-lg text-center ${
                    paymentStatus.includes("success")
                      ? "bg-green-100 text-green-700"
                      : paymentStatus.includes("failed")
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {paymentStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;
