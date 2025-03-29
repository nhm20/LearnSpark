import dotenv from "dotenv";
import braintree from "braintree";
import Order from "../Models/orderModel.js";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).json({ error: "Failed to generate client token" });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate client token" });
  }
};
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

    // Validate input
    if (!nonce || !cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid payment data" });
    }

    const result = await gateway.transaction.sale({
      amount: totalAmount.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    });

    if (result.success) {
      const order = await new Order({
        name: cart[0].name, // Taking first item's name
        price: totalAmount,
        payment: result,
        paymentStatus: "completed"
      }).save();

      return res.json({ success: true, order });
    } else {
      await new Order({
        name: cart[0].name,
        price: totalAmount,
        payment: result,
        paymentStatus: "failed"
      }).save();
      
      return res.status(400).json({ 
        error: result.message || "Payment failed",
        details: result
      });
    }
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};