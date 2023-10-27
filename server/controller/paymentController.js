import Stripe from "stripe";
import { configDotenv } from "dotenv";
configDotenv();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
export const payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.product.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3002/success",
      cancel_url: "http://localhost:3002/cancel",
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
