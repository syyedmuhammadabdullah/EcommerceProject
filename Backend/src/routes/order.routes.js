import { Router } from "express";
import { authMiddleware,handleRefundStatus,cancelOrderRefund,processRefund,requestOrderRefund,updateItemStatus,cancelProducts,reviewProducts,updateShippingStatus,packProducts, createOrder,getSellerOrdersDetail,getCustomerOrders, getOrders,trackOrder,deliveredOrder,getSellerAllOrders, roleCheckMiddleware,getSellerOrders, getOneSellerOrder, updateOrderController, getAllOrders, requestRefund } from "../index.js";

const orderRouter = Router();

orderRouter.get("/getOrders", authMiddleware,roleCheckMiddleware("user"), getOrders);
orderRouter.get("/trackOrder", authMiddleware,roleCheckMiddleware("user"), trackOrder);	
orderRouter.post("/createOrder",authMiddleware,roleCheckMiddleware("user"),createOrder);
orderRouter.post("/requestOrderRefund",authMiddleware,roleCheckMiddleware("user"),requestOrderRefund);
orderRouter.post("/cancelOrderRefund",authMiddleware,roleCheckMiddleware("user"),handleRefundStatus);
orderRouter.post("/handleRefundStatus",authMiddleware,roleCheckMiddleware("seller"),handleRefundStatus);
orderRouter.post("/processRefund",authMiddleware,roleCheckMiddleware("seller"),processRefund);
orderRouter.post("/cancelProducts",authMiddleware,roleCheckMiddleware("user"),cancelProducts);
orderRouter.post("/requestRefund",authMiddleware,roleCheckMiddleware("user"),requestRefund);
orderRouter.post("/reviewProducts",authMiddleware,roleCheckMiddleware("seller"),reviewProducts);
orderRouter.post("/updateShippingStatus",authMiddleware,roleCheckMiddleware("seller"),updateShippingStatus);
orderRouter.post("/packProducts",authMiddleware,roleCheckMiddleware("seller"),packProducts);
orderRouter.post("/updateOrder/:orderId",authMiddleware,roleCheckMiddleware("seller","user","admin"),updateOrderController);
orderRouter.post("/deliveredOrder",authMiddleware,roleCheckMiddleware("user"),deliveredOrder)
orderRouter.get("/getSellerOrders",authMiddleware,roleCheckMiddleware("seller"),getSellerOrders)
orderRouter.get("/getOneSellerOrder",authMiddleware,roleCheckMiddleware("seller","admin"),getOneSellerOrder)
orderRouter.get("/getSellerOrdersDetail",authMiddleware,roleCheckMiddleware("seller","admin"),getSellerOrdersDetail)
orderRouter.get("/getAllOrders",authMiddleware,roleCheckMiddleware("admin"),getAllOrders)
orderRouter.get("/getCustomerOrders",authMiddleware,roleCheckMiddleware("admin"),getCustomerOrders)
orderRouter.get("/getSellerAllOrders",authMiddleware,roleCheckMiddleware("admin"),getSellerAllOrders)
orderRouter.post("/updateItemStatus/:orderId/:itemId",authMiddleware,roleCheckMiddleware("seller","user","admin"),updateItemStatus)
export { orderRouter }