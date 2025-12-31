import {apiError,apiResponse,asyncHandler,SellerTransactionModel} from "../../index.js";
const getSellerWithdrawHistory=asyncHandler(async(req,res)=>{
    
    const sellerId=req.seller.sellerId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const transactions=await SellerTransactionModel.find({sellerId:sellerId,type:"withdrawal"}).skip((page-1)*limit).limit(limit);
    if(!transactions){
        return res.status(400).json(new apiError(400,"Transactions not found"));
    }
    res.status(200).json(new apiResponse(200,"Transactions found successfully",transactions));
})
export {getSellerWithdrawHistory}