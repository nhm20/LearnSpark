import { response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET_KEY,
        },
      }
    );
    console.log("Access Token:", response.data.access_token); // Added for debugging
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: "Magnetism",
              description: "Description of the Magnetism course",
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: "100.00", // Replace with actual unit price
              },
            },
          ],
          amount: {
            currency_code: "USD",
            value: "100.00", // Replace with actual total amount
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "100.00", // Replace with actual item total
              },
            },
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            payment_method_selected: "PAYPAL",
            brand_name: "LEarnSpark",
            shipping_preference: "NO_SHIPPING",
            locale: "en-US",
            user_action: "PAY_NOW",
            return_url: `http://localhost:5173/orders`,
            cancel_url: `http://localhost:5173/courses`,
          },
        },
      },
    };

    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order Created:", response.data);
    const orderId = response.data.id;
    return res.status(200).json({ orderId });
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${process.env.PAYPAL_BASEURL}/v2/checkout/orders/${paymentId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment Captured:", response.data);
    const data = response.data;

    if (data.status !== "COMPLETED") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const email = "helo@gamil.com";
    const daysToExtend = 30;
    const currentDate = new Date();
    const tierEndAt = new Date(currentDate.getTime() + daysToExtend * 24 * 60 * 60 * 1000);

    return res.status(200).json({
      success: true,
      message: "Payment successful",
      data: {
        email,
        tier: "premium",
        tierEndAt,
      },
    });
  } catch (error) {
    console.error("Error capturing payment:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
