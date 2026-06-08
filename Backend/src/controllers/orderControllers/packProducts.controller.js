import { customAlphabet } from "nanoid";
import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel} from "../../index.js";

const packProducts=asyncHandler(async(req,res)=>{
    const {orderId}=req.body;

    const order=await OrderModel.findById(orderId);
    if(!order){
        throw new apiError(404,"Order not found");
    }
    if (order.status!=="processing") {
        throw new apiError(400, "Order is not in processing state");
    }
      const trackingId = customAlphabet("1234567890", 6);
    order.trackingNumber=trackingId();
    order.status="completed";
    order.shipmentStatus="packed";
    order.statusHistory.push({
        status:"packed",
        date:new Date()
    })
    await order.save();
    const notification=NotificationModel.create({
      recipient: order.userId,
      recipientModel: "User",
      type: "order",
      title:"Order updated",
      redirect: true,
      message:`Order with tracking number ${order.id} has been updated`,
      data: {
        orderId: order._id,
        status: order.status,
      },
    })
    io.to(order.sellerId.toString()).emit("orderUpdated",order);
    res.status(200).json(new apiResponse(200,"Order cancelled successfully",order));
})
export {packProducts}