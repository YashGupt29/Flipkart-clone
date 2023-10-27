import Stripe from "stripe";
import { configDotenv } from "dotenv";
configDotenv();

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);
export const payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: req.body.title.shortTitle, // Corrected here
            },
            unit_amount: req.body.price.cost * 100, // Assuming price is also in req.body
          },
          quantity: req.body.quantity,
        },
      ],
      success_url: "http://localhost:3002/success",
      cancel_url: "http://localhost:3002/cancel",
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// export const payment = async (req, res) => {
//   try {
//     console.log(req.body);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.product.map((item) => {
//         return {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: item.title.shortTitle,
//             },
//             unit_amount: item.price.cost * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: "http://localhost:3002/success",
//       cancel_url: "http://localhost:3002/cancel",
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// };
