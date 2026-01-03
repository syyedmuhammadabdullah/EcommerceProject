import mongoose from "mongoose";
import {apiError,apiResponse,asyncHandler,SellerTransactionModel} from "../../index.js";

const updateWithdrawRequest=asyncHandler(async(req,res)=>{
  console.log("update withdraw runs, ",req.body);
  
    let transactionId;
    if(req.body.transcationId){
        if (!mongoose.Types.ObjectId.isValid(req.body.transcationId)) {
            throw new apiError(400,"Invalid transaction id");
        }
            transactionId=new mongoose.Types.ObjectId(req.body.transcationId);
            
    }
    const status=req.body.status;
    const transaction=await SellerTransactionModel.findByIdAndUpdate(transactionId,{status},{new:true})
   
    res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
})
export {updateWithdrawRequest}