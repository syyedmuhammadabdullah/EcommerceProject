import {apiError,apiResponse,asyncHandler,OrderModel,SellerWalletModel,SellerTransactionModel} from "../../index.js";

const getSellerDetails=asyncHandler(async(req,res)=>{
    const sellerWallet=await SellerWalletModel.findOne({sellerId:req.seller.sellerId});
    if(!sellerWallet){
        throw new apiError(400,"Wallet not found");
    }
    const totalOrders=await OrderModel.find({sellerId:req.seller.sellerId}).count();
    const sellerTransactions=await SellerTransactionModel.find({sellerId:req.seller.sellerId,type:"order_payment" });
    const totalEarnings=sellerTransactions.reduce((total,transaction)=>{
            return total+transaction.amount;
    })
   const response={
    totalOrders,
    totalEarnings,
    balance:sellerWallet.balance
   } 
    res.status(200).json(new apiResponse(200,"Wallet found successfully",response));
})
export {getSellerDetails}