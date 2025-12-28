import { Router } from "express";
import { getSellerTransaction,getSellerBalance, authMiddleware, roleCheckMiddleware, requestWithdraw } from "../index.js";
const transactionRouter = Router();

transactionRouter.get("/getTransactions",
    authMiddleware,
    roleCheckMiddleware("seller"),
    getSellerTransaction
);

transactionRouter.get("/balance",
    authMiddleware,
    roleCheckMiddleware("seller"),
    getSellerBalance
);

transactionRouter.post("/requestWithdraw",
    authMiddleware,
    roleCheckMiddleware("seller"),
    requestWithdraw
);



export { transactionRouter };