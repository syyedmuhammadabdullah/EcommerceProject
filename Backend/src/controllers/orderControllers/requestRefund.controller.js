import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel, updateProductsStatus} from "../../index.js";
 

const requestRefund = asyncHandler(async (req, res) => {
    const {orderId,items} = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) throw new apiError(404, "Order not found");

    if (order.shipmentStatus !== "delivered") {
        throw new apiError(400, "Order is not in delivered state");
    }

    if (order.refundStatus === "requested") {
        throw new apiError(400, "Refund has already been requested");
    }
    if(items.legth===0){
        throw new apiError(400,"No items selected");
    }
    updateProductsStatus(order,items,null,"requested");

    order.refundStatus = "requested";
    order.statusHistory.push({
        status: "refundRequested",
        date: new Date(),
    })
    await order.save();

    const notification = await NotificationModel.create({
        recipient: order.userId,
        recipientModel: "User",
        type: "order",
        title: "Order updated",
        redirect: true,
        message: `Order with tracking number ${order.id} has been updated`,
        orderId: order.id,
    });

    io.to(order.userId).emit("notification", notification);

  res.status(200).json(new apiResponse(200, "Refund requested successfully", order));
    });

export {requestRefund};