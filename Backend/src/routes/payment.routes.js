import { Router } from "express";
import { authMiddleware, createStripePayment } from "../index.js";

const paymentRouter=Router()

paymentRouter.post("/stripe/create-payment",authMiddleware,createStripePayment)

export {paymentRouter}