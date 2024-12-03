import { Router } from "express";
import { authMiddleware, createOrder, getOrders,trackOrder,deliveredOrder, roleCheckMiddleware } from "../index.js";
const orderRouter = Router();

orderRouter.get("/getOrders", authMiddleware,roleCheckMiddleware("user"), getOrders);
orderRouter.get("/trackOrder", authMiddleware,roleCheckMiddleware("user"), trackOrder);	
orderRouter.post("/createOrder",authMiddleware,roleCheckMiddleware("user"),createOrder)
orderRouter.post("/deliveredOrder",authMiddleware,roleCheckMiddleware("user"),deliveredOrder)
export { orderRouter }