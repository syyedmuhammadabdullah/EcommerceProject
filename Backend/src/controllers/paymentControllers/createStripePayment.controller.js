import Stripe from "stripe";
import {asyncHandler,apiResponse} from "../../index.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const createStripePayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount*100,
        currency: "pkr",
        payment_method_types: ["card"],
    });
    res.status(200).json(new apiResponse(200, "Payment intent created successfully", paymentIntent));
});

export {createStripePayment}