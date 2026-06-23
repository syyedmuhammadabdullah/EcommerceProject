import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel, SellerWalletModel, SellerTransactionModel} from "../../index.js";

const processRefund=asyncHandler(async(req,res)=>{
     const {orderId}=req.body;
     const order=await OrderModel.findById(orderId);
     if(!order){
          throw new apiError(404,"Order not found");
     }

     
const approvedItems = order.products.filter(
    item => item.refundStatus === "approved"
);

const rejectedCount = order.products.filter(
    item => item.refundStatus === "rejected"
).length;

if (approvedItems > 0 && rejectedCount > 0) {
    order.refundStatus ="partially refunded";
    order.statusHistory.push({
        status: "partially refunded",
        date: new Date(),
    })
}
else if (approvedItems > 0 && rejectedCount === 0) {
    order.refundStatus = "refunded";
    order.statusHistory.push({
        status: "refunded",
        date: new Date(),
    })
}
const SellerWallet= await SellerWalletModel.findOneAndUpdate(
    { sellerId: order.sellerId },
    { $inc: { balance: -order.refundAmount } },
    { new: true }
)
 await SellerTransactionModel.create({
    walletId: SellerWallet._id,
    sellerId: order.sellerId,
    orderId: order._id,
    amount: order.refundAmount,
    type: "refund",
    status: "completed"
  });
          await order.save();
          res.status(200).json(new apiResponse(200,"Order updated successfully",order));
        
})
export {processRefund}