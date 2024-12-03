import { Router } from "express";
import { addItemToCart, getUserCart, removeItemFromCart, updateCartItem,authMiddleware,roleCheckMiddleware } from "../index.js";
const cartRouter = Router();
cartRouter.post("/addItemToCart", authMiddleware,roleCheckMiddleware("user"), addItemToCart);
cartRouter.get("/getUserCart", authMiddleware,roleCheckMiddleware("user"), getUserCart);
cartRouter.post("/removeItemFromCart", authMiddleware,roleCheckMiddleware("user"), removeItemFromCart);
cartRouter.post("/updateCartItem", authMiddleware,roleCheckMiddleware("user"), updateCartItem);

export { cartRouter }