import { Router } from "express";
import { getSellerTransaction,getSellerBalance, authMiddleware, roleCheckMiddleware, requestWithdraw, updateWithdrawRequest, getSellerWithdrawHistory, getPendingWithdrawalRequest } from "../index.js";
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
transactionRouter.post("/updateWithdrawRequest",
    authMiddleware,
    roleCheckMiddleware("admin"),
    updateWithdrawRequest
);
transactionRouter.get("/getWithdrawRequests",
    authMiddleware,
    roleCheckMiddleware("admin"),
    getSellerWithdrawHistory
);
transactionRouterget("/getPendingWithdrawRequest",
    authMiddleware,
    roleCheckMiddleware("admin"),
    getPendingWithdrawalRequest
);

export { transactionRouter };