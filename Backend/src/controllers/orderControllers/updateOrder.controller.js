import {
  apiError,
  apiResponse,
  asyncHandler,
  OrderModel,
  SellerTransactionModel,
  SellerWalletModel
} from "../../index.js";

export const updateOrderController = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await OrderModel.findById(orderId);
  if (!order) {
    return new apiError( 404, "Order not found");
  }

  // ✅ same status guard
  if (order.status === status) {
    return new apiResponse( 200, "Order already in this state", order);
  }

  /* =========================
     DELIVERED FLOW
  ========================== */
  if (status === "delivered") {

    // ❌ invalid transition
    if (order.status !== "pending") {
        console.log("invalid",order.status==="pending", order.status, status);
        
      throw new apiError( 400, "Order cannot be delivered");
    }


    // ✅ check already credited
    const existingPayment = await SellerTransactionModel.findOne({
      orderId: order._id,
      type: "order_payment"
    });


    if (!existingPayment) {
        
      
        const wallet = await SellerWalletModel.findOneAndUpdate(
            { sellerId: order.sellerId },
            { $inc: { balance: order.totalPrice } }
        );

      await SellerTransactionModel.create({
        walletId: wallet._id,
        sellerId: order.sellerId,
        orderId: order._id,
        amount: order.totalPrice,
        type: "order_payment",
        status: "completed",
      });
    }
  }
  /* =========================
     REFUND FLOW
  ========================== */
  if (status === "refunded") {

    // ❌ invalid transition
    if (order.status !== "delivered") {
      return new apiError( 400, "Only delivered orders can be refunded");
    }

    // ✅ check already refunded
    const existingRefund = await SellerTransactionModel.findOne({
      orderId: order._id,
      type: "refund"
    });

    if (!existingRefund) {
      const wallet = await SellerWalletModel.findOneAndUpdate(
        { sellerId: order.sellerId },
        { $inc: { balance: -order.totalPrice} }
      );

      await SellerTransactionModel.create({
        walletId: wallet._id,
        sellerId: order.sellerId,
        orderId: order._id,
        amount: order.totalPrice, 
        type: "refund",
        status: "completed",
      });
    }
  }

  // ✅ finally update order status
  
  order.status = status;
  await order.save();

  return new apiResponse( 200, "Order updated successfully", order);
});
