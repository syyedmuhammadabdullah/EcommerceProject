import { Router } from "express";
import { authMiddleware, createOrder,getSellerOrdersDetail,getCustomerOrders, getOrders,trackOrder,deliveredOrder,getSellerAllOrders, roleCheckMiddleware,getSellerOrders, getOneSellerOrder, updateOrderController, getAllOrders } from "../index.js";
const orderRouter = Router();

orderRouter.get("/getOrders", authMiddleware,roleCheckMiddleware("user"), getOrders);
orderRouter.get("/trackOrder", authMiddleware,roleCheckMiddleware("user"), trackOrder);	
orderRouter.post("/createOrder",authMiddleware,roleCheckMiddleware("user"),createOrder);
orderRouter.post("/updateOrder/:orderId",authMiddleware,roleCheckMiddleware("seller"),updateOrderController);
orderRouter.post("/deliveredOrder",authMiddleware,roleCheckMiddleware("user"),deliveredOrder)
orderRouter.get("/getSellerOrders",authMiddleware,roleCheckMiddleware("seller"),getSellerOrders)
orderRouter.get("/getOneSellerOrder",authMiddleware,roleCheckMiddleware("seller"),getOneSellerOrder)
orderRouter.get("/getSellerOrdersDetail",authMiddleware,roleCheckMiddleware("seller","admin"),getSellerOrdersDetail)
orderRouter.get("/getAllOrders",authMiddleware,roleCheckMiddleware("admin"),getAllOrders)
orderRouter.get("/getCustomerOrders",authMiddleware,roleCheckMiddleware("admin"),getCustomerOrders)
orderRouter.get("/getSellerAllOrders",authMiddleware,roleCheckMiddleware("admin"),getSellerAllOrders)

export { orderRouter }