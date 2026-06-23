import { Router } from "express";
import { authMiddleware, createStripePayment,roleCheckMiddleware,createConnectSession } from "../index.js";

const paymentRouter=Router()

paymentRouter.post("/stripe/create-payment",authMiddleware,createStripePayment);
paymentRouter.post("/stripe/create-connect-session",authMiddleware,roleCheckMiddleware("seller"),createConnectSession);

export {paymentRouter}