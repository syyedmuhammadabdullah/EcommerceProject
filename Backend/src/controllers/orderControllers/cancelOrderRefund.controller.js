import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel} from "../../index.js";

const cancelOrderRefund = asyncHandler(async (req, res) => {
    const {orderId} = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) throw new apiError(404, "Order not found");

    if (order.shipmentStatus !== "delivered") {
        throw new apiError(400, "Order is not in delivered state");
    }

    if (order.refundStatus !== "requested") {
        throw new apiError(400, "Refund has not been requested");
    }

    order.refundStatus = "cannelled";
    order.statusHistory.push({
        status: "cannelled",
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
        data: {
            orderId: order.id,
            status: order.status,
        },
    });

    io.to(order.userId.toString()).emit("notification", notification);

    res.status(200).json(new apiResponse(200, "Order updated successfully", order));
});

export  {cancelOrderRefund};