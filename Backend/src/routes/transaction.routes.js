import { Router } from "express";
import { getSellerTransaction,getSellerBalance, authMiddleware, roleCheckMiddleware, requestWithdraw, updateWithdrawRequest, getSellerWithdrawHistory, getPendingWithdrawalRequest, getAllTransactionController,getSellerWithdrawal } from "../index.js";
const transactionRouter = Router();

transactionRouter.get("/getTransactions",
    authMiddleware,
    roleCheckMiddleware("seller", "admin"),
    getSellerTransaction
);

transactionRouter.get("/getAllTransactions",
    authMiddleware,
    roleCheckMiddleware("seller", "admin"),
    getAllTransactionController
);

transactionRouter.get("/getSellerWithdrawal",
    authMiddleware,
    roleCheckMiddleware("seller"),
    getSellerWithdrawal
);

transactionRouter.get("/balance",
    authMiddleware,
    roleCheckMiddleware("seller", "admin"),
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
transactionRouter.get("/getPendingWithdrawRequest",
    authMiddleware,
    roleCheckMiddleware("admin"),
    getPendingWithdrawalRequest
);

export { transactionRouter };