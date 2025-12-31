import {apiError, apiResponse, asyncHandler, SellerTransactionModel} from "../../index.js";

const getPendingWithdrawalRequest = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
        const pendingWithdrawals = await SellerTransactionModel.find({ type: "withdrawal", status: "pending" }).skip((page - 1) * limit).limit(limit);
        res.status(200).json(new apiResponse(200, "Pending withdrawals found successfully", pendingWithdrawals));
    });
    
    export { getPendingWithdrawalRequest };