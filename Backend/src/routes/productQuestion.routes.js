import { Router } from "express";
import {
    createProductQuestion,
    getProductQuestion,
    deleteProductQuestion,
    updateAnswerToProductQuestion,
    updateProductQuestion,
    authMiddleware,
    roleCheckMiddleware,
} from "../index.js";

const productQuestionRouter = Router();

productQuestionRouter.post("/createProductQuestion", authMiddleware,roleCheckMiddleware("user"), createProductQuestion);
productQuestionRouter.post("/deleteProductQuestion", authMiddleware,roleCheckMiddleware("user"), deleteProductQuestion);
productQuestionRouter.post("/updateProductQuestion", authMiddleware,roleCheckMiddleware("user"), updateProductQuestion);
productQuestionRouter.post("/updateAnswerToProductQuestion", authMiddleware,roleCheckMiddleware("seller"), updateAnswerToProductQuestion);
productQuestionRouter.get("/getProductQuestion", getProductQuestion);

export { productQuestionRouter };
