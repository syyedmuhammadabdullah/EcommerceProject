import mongoose from "mongoose";
import {apiError,apiResponse,asyncHandler,io,NotificationModel,SellerModel,SellerTransactionModel,SellerWalletModel, SellerWithdrawalModel, stripe} from "../../index.js";

const updateWithdrawRequest=asyncHandler(async(req,res)=>{
  
    let transactionId;
    if(req.body.transcationId){
        if (!mongoose.Types.ObjectId.isValid(req.body.transcationId)) {
            throw new apiError(400,"Invalid transaction id");
        }
            transactionId=new mongoose.Types.ObjectId(req.body.transcationId);
            
    }

    
    const status=req.body.status;
    const transaction=await SellerWithdrawalModel.findByIdAndUpdate(transactionId,{status},{new:true})
    
     const notification=await NotificationModel.create({
        recipientModel:"Seller",
        recipient:transaction.sellerId,
        title:"Withdrawal Update",
        redirect:false,
        type:"withdrawal",
        data:{transactionId:transaction._id,status},
        message:`Your withdrawal request of amount RS ${transaction.amount} has been ${status}.`
    })
    io.to(transaction.sellerId.toString()).emit("notification", notification);
        io.to(transaction.sellerId.toString()).emit("withdrawStatusUpdate", { transactionId: transaction._id, status });

  

    if (status==="rejected") {
        
      return res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
    }


    
    const seller=await SellerModel.findById(transaction.sellerId);

    if(!seller.stripeAccountId){
        throw new apiError(400,"bank account not linked")
    }
   

    
    const sellerWallet=await SellerWalletModel.findOne({sellerId:transaction.sellerId});
    if(!sellerWallet){
        throw new apiError(400,"Wallet not found");
    }
    const transfer = await stripe.transfers.create({
  amount: transaction.amount, // 50 USD cents mein
  currency: "usd",
  destination: seller.stripeAccountId,
});
    await SellerTransactionModel.create({
        walletId:sellerWallet._id,
        type:"withwadral",
        amount:transaction.amount,
        sellerId:transaction.sellerId,
        status:"completed"
    })
    sellerWallet.balance -= transaction.amount;
    await sellerWallet.save();
 
    res.status(200).json(new apiResponse(200,"Transaction updated successfully",transaction));
})
export {updateWithdrawRequest}