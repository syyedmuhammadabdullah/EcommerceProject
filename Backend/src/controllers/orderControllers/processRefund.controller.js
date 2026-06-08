import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel} from "../../index.js";

const processRefund=asyncHandler(async(req,res)=>{
     const {orderId}=req.body;
     const order=await OrderModel.findById(orderId);
     if(!order){
          throw new apiError(404,"Order not found");
     }

     
const approvedCount = order.products.filter(
    item => item.refundStatus === "approved"
).length;

const rejectedCount = order.products.filter(
    item => item.refundStatus === "rejected"
).length;

if (approvedCount > 0 && rejectedCount > 0) {
    order.refundStatus ="partially refunded";
    order.statusHistory.push({
        status: "partially refunded",
        date: new Date(),
    })
}
else if (approvedCount > 0 && rejectedCount === 0) {
    order.refundStatus = "refunded";
    order.statusHistory.push({
        status: "refunded",
        date: new Date(),
    })
}

          await order.save();
          res.status(200).json(new apiResponse(200,"Order updated successfully",order));
        
})
export {processRefund}