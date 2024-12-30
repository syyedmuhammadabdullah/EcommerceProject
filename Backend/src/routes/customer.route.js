import { Router } from "express";
import { getAllSellerCustomers, authMiddleware, roleCheckMiddleware } from "../index.js";
const customerRouter = Router();

customerRouter.get("/getAllSellerCustomers",authMiddleware,roleCheckMiddleware("seller"),getAllSellerCustomers)

export { customerRouter };