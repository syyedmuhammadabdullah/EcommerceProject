import {
  apiError,
  apiResponse,
  asyncHandler,
  OrderModel,
  SellerTransactionModel,
  SellerWalletModel
} from "../../index.js";

// export const updateOrderController = asyncHandler(async (req, res) => {
//   const { orderId } = req.params;
//   const { status } = req.body;

//   const order = await OrderModel.findById(orderId);
//   if (!order) {
//     return new apiError( 404, "Order not found");
//   }

//   // ✅ same status guard
//   if (order.status === status) {
//     return new apiResponse( 200, "Order already in this state", order);
//   }

//   /* =========================
//      DELIVERED FLOW
//   ========================== */
//   if (status === "delivered") {

//     // ❌ invalid transition
//     if (order.status !== "pending" ) {
              
//       throw new apiError( 400, "Order cannot be delivered");
//     }


//     // ✅ check already credited
//     const existingPayment = await SellerTransactionModel.findOne({
//       orderId: order._id,
//       type: "order_payment"
//     });


//     if (!existingPayment) {
        
//       const commission = order.totalPrice * 0.1;

//         const wallet = await SellerWalletModel.findOneAndUpdate(
//             { sellerId: order.sellerId },
//             { $inc: { balance: order.totalPrice-commission } }
//         );

//       await SellerTransactionModel.create({
//         walletId: wallet._id,
//         sellerId: order.sellerId,
//         orderId: order._id,
//         amount: order.totalPrice-commission,
//         type: "order_payment",
//         status: "completed",
//       });
//     }
//     order.commissionAmount=commission;
//     order.paymentStatus = "completed";
//   }
//   /* =========================
//      REFUND FLOW
//   ========================== */
//   if (status === "refunded") {

//     // ❌ invalid transition
//     if (order.status !== "delivered") {
//       return new apiError( 400, "Only delivered orders can be refunded");
//     }

//     // ✅ check already refunded
//     const existingRefund = await SellerTransactionModel.findOne({
//       orderId: order._id,
//       type: "refund"
//     });

//     if (!existingRefund) {
//       const wallet = await SellerWalletModel.findOneAndUpdate(
//         { sellerId: order.sellerId },
//         { $inc: { balance: -(order.totalPrice+order.commissionAmount)} }
//       );

//       await SellerTransactionModel.create({
//         walletId: wallet._id,
//         sellerId: order.sellerId,
//         orderId: order._id,
//         amount: order.totalPrice+order.commissionAmount, 
//         type: "refund",
//         status: "completed",
//       });
//     }
//     order.commissionAmount=0;
//     order.paymentStatus = "refunded";
//   }

//   // ✅ finally update order status
  
//   order.status = status;
//   await order.save();

//   return new apiResponse( 200, "Order updated successfully", order);
// });


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

    if (!["pending", "shipped"].includes(order.status)) {
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
  await order.save();

  return new apiResponse(200, "Order updated successfully", order);
});
