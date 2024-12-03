import { Router } from "express";
import { addItemToWishlist,authMiddleware,getWishlist,removeItemFromWishlist, roleCheckMiddleware } from "../index.js";
const wishlistRouter = Router();
wishlistRouter.post("/addItemToWishlist",authMiddleware,roleCheckMiddleware("user"), addItemToWishlist);
wishlistRouter.get("/getWishlist",authMiddleware,roleCheckMiddleware("user"), getWishlist);
wishlistRouter.post("/removeItemFromWishlist",authMiddleware,roleCheckMiddleware("user"), removeItemFromWishlist);
export { wishlistRouter };