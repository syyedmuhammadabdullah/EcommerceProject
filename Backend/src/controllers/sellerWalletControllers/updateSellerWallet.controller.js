import {apiError, apiResponse, asyncHandler, SellerWalletModel,SellerTransactionModel} from "../../index.js";


export const updateSellerWallet = asyncHandler(async (req, res, next) => {
    console.log("update seller wallet runs",req.body);
});
