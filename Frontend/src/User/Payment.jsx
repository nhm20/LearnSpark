import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const CoursePayment = () => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, // Make sure this is correct
    currency: "USD",
    intent: "capture", // lowercase might work better
    environment: "sandbox" // ensure this is set
  };
  const styles = {
    shape: "rect",
    layout: "vertical",
  };
  
  const navigate = useNavigate();

  const onApprove = async (data) => {
    try {
      if (!data.orderID) {
        console.error("No order ID returned from PayPal");
        return;
      }
      const response = await axios.get(
        `http://localhost:8000/api/orders/capturepayment/${data.orderID}`
      );
      const res = response.data;
      console.log("Payment successful:", res);
      navigate("/complete-payment"); // Navigate to confirmation page
    } catch (error) {
      console.error("Error capturing payment:", error);
      navigate("/cancel-payment"); // Navigate to cancellation page
    }
  };

  const onError = (error) => {
    console.error("Error during PayPal transaction:", error);
  };

  const onCreateOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders/createorder"
      );
      return response.data.orderId; // Ensure your backend returns orderId
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Complete Your Payment</h1>
        </header>
        <h2>Select Plan</h2>
        <p>Free Limited features</p>
        <p>Premium Unlimited features</p>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={styles}
            createOrder={onCreateOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default CoursePayment;
