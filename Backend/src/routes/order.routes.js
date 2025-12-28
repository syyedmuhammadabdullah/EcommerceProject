import { Router } from "express";
import { authMiddleware, createOrder,getSellerOrdersDetail, getOrders,trackOrder,deliveredOrder, roleCheckMiddleware,getSellerOrders, getOneSellerOrder, updateOrderController } from "../index.js";
const orderRouter = Router();

orderRouter.get("/getOrders", authMiddleware,roleCheckMiddleware("user"), getOrders);
orderRouter.get("/trackOrder", authMiddleware,roleCheckMiddleware("user"), trackOrder);	
orderRouter.post("/createOrder",authMiddleware,roleCheckMiddleware("user"),createOrder);
orderRouter.post("/updateOrder/:orderId",authMiddleware,roleCheckMiddleware("seller"),updateOrderController);
orderRouter.post("/deliveredOrder",authMiddleware,roleCheckMiddleware("user"),deliveredOrder)
orderRouter.get("/getSellerOrders",authMiddleware,roleCheckMiddleware("seller"),getSellerOrders)
orderRouter.get("/getOneSellerOrder",authMiddleware,roleCheckMiddleware("seller"),getOneSellerOrder)
orderRouter.get("/getSellerOrdersDetail",authMiddleware,roleCheckMiddleware("seller"),getSellerOrdersDetail)
export { orderRouter }