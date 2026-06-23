import {asyncHandler,apiError,apiResponse,OrderModel, io, NotificationModel} from "../../index.js";




const handleRefundStatus=asyncHandler(async(req,res)=>{
    const {orderId,refundStatus,items}=req.body;

    const order=await OrderModel.findById(orderId);
    if(!order){
        throw new apiError(404,"Order not found");
    }
    const enums=['approved',"requested","processing","refunded","partially refunded", 'rejected'];
   const validTransitions = {
    requested: ["approved", "rejected"],
    approved: ["processing"],
    processing: ["partially refunded", "refunded"],
};

    if(!enums.includes(refundStatus)){
        throw new apiError(400,"Invalid refund status");
    }
    if(order.refundStatus===refundStatus){
        throw new apiError(400,"Refund status already set");
    }
    if(order.status!=="completed"){
        throw new apiError(400,"Order is not in completed state");
    }

if (
    !validTransitions[order.refundStatus]?.includes(refundStatus)
) {
    throw new apiError(400, "Invalid refund status transition");
}

if (refundStatus === "approved") {
    const selectedSet = new Set(items);

    order.products = order.products.map((item) => {
        if (selectedSet.has(item.productId.toString())) {
            return {
                ...item,
                refundStatus: "approved",
                refundAmount: item.priceAtPurchase * item.quantity
            };
        }

                if (item.status!=="cancelled"&&item.status!=="rejected") {
            return {
                ...item,
                refundStatus: "rejected",
            };
        }
        return item;
    });

    const approvedCount = order.products.filter(
        item => item.refundStatus === "approved"
    ).length;

    // Agar aik bhi product approve hua hai
    order.refundStatus =
        approvedCount > 0 &&"processing";
        order.statusHistory.push({
            status: "refundProcessing",
            date: new Date(),
        })
}

else if (refundStatus === "rejected") {

    const selectedSet = new Set(items);

    order.products = order.products.map((item) => {
        if (selectedSet.has(item.productId.toString())) {
            return {
                ...item,
                refundStatus: "rejected",
            };
        }

        if (item.status!=="cancelled"&&item.status!=="rejected") {
            return {
                ...item,
                refundStatus: "approved",
                refundAmount: item.priceAtPurchase * item.quantity
            };
        }
        return item;
    });

    const approvedCount = order.products.filter(
        item => item.refundStatus === "approved"
    ).length;

    order.refundStatus =
        approvedCount > 0 ? "processing" : "rejected";
        order.statusHistory.push({
            status:order.refundStatus==="rejected"?"refundRejected":"refundProcessing",
            date: new Date(),
        })        
}
    await order.save();

    const notification=await NotificationModel.create({
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
    res.status(200).json(new apiResponse(200,"Order updated successfully",order));
})
export {handleRefundStatus}