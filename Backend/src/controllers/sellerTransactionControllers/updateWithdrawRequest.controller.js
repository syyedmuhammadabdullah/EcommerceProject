import {apiError,apiResponse,asyncHandler,SellerTransactionModel} from "../../index.js";

const updateWithdrawRequest=asyncHandler(async(req,res)=>{
    const sellerId=req.body.sellerId;
    const transaction=await SellerTransactionModel.findOne({sellerId:sellerId,type:"withdrawal",status:"pending"});
    if(!transaction){
        return res.status(400).json(new apiError(400,"Sellers not found"));
    }
    res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
})
export {updateWithdrawRequest}