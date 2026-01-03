import mongoose from "mongoose";
import {apiError, apiResponse, asyncHandler, SellerTransactionModel} from "../../index.js";

const getSellerPendingWithdrawalRequest = asyncHandler(async (req, res) => {
    const {page=1,limit=10,filter}=req.query
    
    let sellerId;
    if (req.query.sellerId) {
        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        throw new apiError(400, "Invalid seller id");
        }
        sellerId=new mongoose.Types.ObjectId(req.query.sellerId);
    }

    let query={
        sellerId,
        type:"withdrawal",
    };
    if (filter&&filter!=="all") {
        query.status=filter
    }
    const pendingWithdrawals = await SellerTransactionModel.find(query).select({path:"sellerId",select:"storeDetails.storeName -_id"}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(new apiResponse(200, "Pending withdrawals found successfully", pendingWithdrawals));
    });
    
    export { getSellerPendingWithdrawalRequest };