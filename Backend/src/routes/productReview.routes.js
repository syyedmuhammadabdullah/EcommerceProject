import { Router } from "express";
import { createProductReview,getUserProductReview,authMiddleware,updateProductReview, roleCheckMiddleware ,getProductReview} from "../index.js";
const productReviewRouter=Router()
productReviewRouter.get("/getUserProductReview",authMiddleware,roleCheckMiddleware("user"),getUserProductReview);
productReviewRouter.post("/createProductReview",authMiddleware,roleCheckMiddleware("user"),createProductReview);
productReviewRouter.post("/updateProductReview",authMiddleware,roleCheckMiddleware("user"),updateProductReview);
productReviewRouter.get("/getProductReview",getProductReview)
export {productReviewRouter}