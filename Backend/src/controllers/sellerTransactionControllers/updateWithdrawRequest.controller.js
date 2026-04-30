import mongoose from "mongoose";
import {apiError,apiResponse,asyncHandler,io,NotificationModel,SellerTransactionModel,SellerWalletModel} from "../../index.js";

const updateWithdrawRequest=asyncHandler(async(req,res)=>{
  
    let transactionId;
    if(req.body.transcationId){
        if (!mongoose.Types.ObjectId.isValid(req.body.transcationId)) {
            throw new apiError(400,"Invalid transaction id");
        }
            transactionId=new mongoose.Types.ObjectId(req.body.transcationId);
            
    }
    const status=req.body.status;
    const transaction=await SellerTransactionModel.findByIdAndUpdate(transactionId,{status},{new:true})
   
       const notification=await NotificationModel.create({
        recipientModel:"Seller",
        recipient:transaction.sellerId,
        title:"Withdrawal Update",
        redirect:false,
        type:"withdrawal",
        data:{transactionId:transaction._id},
        message:`Your withdrawal request of amount RS ${transaction.amount} has been ${status}.`
    })
    io.to(transaction.sellerId.toString()).emit("notification", notification);

    if (status==="rejected") {
        console.log("rejected");
        
      return res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
    }
    const sellerWallet=await SellerWalletModel.findOne({sellerId:transaction.sellerId});
    if(!sellerWallet){
        throw new apiError(400,"Wallet not found");
    }
    sellerWallet.balance -= transaction.amount;
    await sellerWallet.save();
 
    res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
})
export {updateWithdrawRequest}