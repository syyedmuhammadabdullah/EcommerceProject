import { Router } from "express";
import { getAllSellerCustomers, authMiddleware, roleCheckMiddleware, getAllCustomers, } from "../index.js";
const customerRouter = Router();

customerRouter.get("/getAllSellerCustomers",authMiddleware,roleCheckMiddleware("seller"),getAllSellerCustomers)
customerRouter.get("/getAllCustomers",authMiddleware,roleCheckMiddleware("admin"),getAllCustomers)
export { customerRouter };