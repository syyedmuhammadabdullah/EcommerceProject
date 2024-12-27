import { Router } from "express";
import { createSeller,loginSeller, updateSellerDetails, roleCheckMiddleware, authMiddleware,getSellerProductsQuestion } from "../index.js";
const sellerRouter = Router();

sellerRouter.post("/createSeller", createSeller);
sellerRouter.post("/loginSeller", loginSeller);
sellerRouter.post("/updateSellerDetails", updateSellerDetails);
sellerRouter.get("/getSellerProductsQuestion",authMiddleware,roleCheckMiddleware("seller"),getSellerProductsQuestion)

export { sellerRouter };