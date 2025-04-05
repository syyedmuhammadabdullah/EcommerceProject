import { Router } from "express";
import { getAllSellerCustomers, authMiddleware, roleCheckMiddleware } from "../index.js";
const couponRouter = Router();

couponRouter.get("/getAllSellerCustomers",authMiddleware,roleCheckMiddleware("seller"),getAllSellerCustomers)

export { couponRouter };