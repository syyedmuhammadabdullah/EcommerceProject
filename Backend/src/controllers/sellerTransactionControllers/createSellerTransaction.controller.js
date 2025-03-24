import {apiError, apiResponse, asyncHandler, SellerWalletModel,SellerTransactionModel} from "../../index.js";


export const createSellerTransaction = asyncHandler(async (req, res, next) => {
    console.log("create seller transaction runs",req.body);
});