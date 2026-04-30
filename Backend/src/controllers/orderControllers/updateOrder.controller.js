import {
  apiError,
  apiResponse,
  asyncHandler,
  OrderModel,
  SellerTransactionModel,
  SellerWalletModel,io,
  NotificationModel,
  ProductModel
} from "../../index.js";

export const updateOrderController = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await OrderModel.findById(orderId);
  if (!order) throw new apiError(404, "Order not found");

  if (order.status === status) {
    return new apiResponse(200, "Order already in this state", order);
  }

  const commissionRate = 0.1;
  const commission = order.totalPrice * commissionRate;
  const sellerEarning = order.totalPrice - commission;

  /* =========================
      DELIVERED FLOW
  ========================== */
  if (status === "delivered") {

    if (!["pending", "shipped","out for delivery"].includes(order.status)) {
      throw new apiError(400, "Invalid order transition");
    }

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

    order.commissionAmount = commission;
    order.paymentStatus = "completed";
  }

  /* =========================
      REFUND FLOW
  ========================== */
  if (status === "refunded") {

    if (order.status !== "delivered") {
      throw new apiError(400, "Only delivered orders can be refunded");
    }

    const existingRefund = await SellerTransactionModel.findOne({
      orderId: order._id,
      type: "refund"
    });

    if (!existingRefund) {
      const refundAmount = order.totalPrice - order.commissionAmount;

      const wallet = await SellerWalletModel.findOneAndUpdate(
        { sellerId: order.sellerId },
        { $inc: { balance: -refundAmount } },
        { new: true }
      );

      await SellerTransactionModel.create({
        walletId: wallet._id,
        sellerId: order.sellerId,
        orderId: order._id,
        amount: refundAmount,
        type: "refund",
        status: "completed"
      });
    }

    order.paymentStatus = "refunded";
  }

  order.status = status;
  order.statusHistory.push({ status, timestamp: new Date() });
  await order.save();
    const notification=await NotificationModel.create({
      recipient: order.userId,
      recipientModel: "User",
      type: "order",
      title:status === "delivered" ? "Order Delivered" : "Order updated",
      redirect: true,
      message:status === "delivered" ? `Order with tracking number ${order.trackingNumber} has been delivered Please give your review` : `Order with tracking number ${order.trackingNumber} has been updated`,
      data: {
        orderId: order._id,
        status: order.status,
      },
    })
    
io.to(order.userId.toString()).emit("notification", notification);

  return new apiResponse(200, "Order updated successfully", order);
});
