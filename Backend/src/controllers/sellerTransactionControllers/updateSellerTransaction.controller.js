import {apiError, apiResponse, asyncHandler, SellerWalletModel,SellerTransactionModel} from "../../index.js";


export const updateSellerTransaction = asyncHandler(async (req, res, next) => {
    console.log("update seller transaction runs",req.body);
});