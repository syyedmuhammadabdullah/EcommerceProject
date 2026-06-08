import {asyncHandler,apiError,apiResponse,OrderModel, SellerModel, SellerTransactionModel, SellerWalletModel, NotificationModel, io} from "../../index.js";

const updateShippingStatus=asyncHandler(async(req,res)=>{
    
    const {orderId,shippingStatus}=req.body;
    const order=await OrderModel.findById(orderId);
    const enums={
        shipped:"shipped",
        delivered:"delivered",
        "out for delivery":"out for delivery"
    }
    const statusFlow={
        packed:"shipped",
        shipped:"out for delivery",
        "out for delivery":"delivered"
    }
    if(!order){
        throw new apiError(404,"Order not found");
    }
    if(order.shipmentStatus===shippingStatus){
        throw new apiError(400,"Order is already in this state");
    }
    if (!enums[shippingStatus]) {
        throw new apiError(400, "Invalid shipping status");
    }
    if (statusFlow[order.shipmentStatus] !== shippingStatus) {
        throw new apiError(400, "Invalid order transition");
    }
    order.shipmentStatus=shippingStatus;
    order.statusHistory.push({
        status:shippingStatus,
        date:new Date()
    })



    if(shippingStatus==="delivered"){


          const commissionRate = 0.1;
  const commission = Number((order.totalPrice * commissionRate).toFixed(2));
  const sellerEarning = Number((order.totalPrice - commission).toFixed(2));
  

const existingPayment = await SellerTransactionModel.findOne({
      orderId: order._id,
      type: "order_payment"
    });

    if (!existingPayment) {
      const wallet = await SellerWalletModel.findOneAndUpdate(
        { sellerId: order.sellerId },
        { $inc: { balance: sellerEarning } },
        { new: true, upsert: true }
      );

      await SellerTransactionModel.create({
        walletId: wallet._id,
        sellerId: order.sellerId,
        orderId: order._id,
        amount: sellerEarning,
        type: "order_payment",
        status: "completed"
      });
    }

    await SellerModel.findByIdAndUpdate(order.sellerId,{ $inc: { "performanceMetrics.totalSales": order.totalPrice } });

    order.commissionAmount = commission;
    order.paymentStatus = "completed";
    }

    const notification=NotificationModel.create({
      recipient: order?.userId,
      recipientModel: "User",
      type: "order",
      title:"Order updated",
      redirect: true,
      message:`Order with tracking number ${order.trackingNumber} has been updated`,
      data: {
        orderId: order?._id,
        status: order?.status,
      },
    });
    io.to(order.userId.toString()).emit("notification", notification);
    await order.save();
    res.status(200).json(new apiResponse(200,"Order cancelled successfully",order));


})
export {updateShippingStatus}