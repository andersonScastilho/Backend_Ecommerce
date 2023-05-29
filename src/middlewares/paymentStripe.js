const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const PAYMENT_CONFIRMATION_URL = `${process.env.FRONT_END_URL}/payment-confirmation`;

export default async (req, res, next) => {
  try {
    const items = req.body.products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
        },
        unit_amount: parseInt(`${product.price}00`),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: "payment",
      success_url: `${PAYMENT_CONFIRMATION_URL}?success=true`,
      cancel_url: `${PAYMENT_CONFIRMATION_URL}?canceled=true`,
    });

    res.send({ url: session.url });

    next();
  } catch (error) {
    console.log(error);
  }
};
