import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

export const checkoutSessionController = async (req, res) => {
  try {
    const { course } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: { name: course.name },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      },
    ];

    // Create a checkout session (Stripe requires at least 30 mins)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 min (Stripe minimum)
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/retry`,
    });

    // Simulate 2-minute expiration
    setTimeout(async () => {
      try {
        const sessionDetails = await stripe.checkout.sessions.retrieve(
          session.id
        );
        if (sessionDetails.status === "open") {
          await stripe.checkout.sessions.expire(session.id);
          console.log(`Session ${session.id} expired after 2 minutes.`);
        }
      } catch (error) {
        console.error("Error expiring session:", error);
      }
    }, 120000); // 2 minutes

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
