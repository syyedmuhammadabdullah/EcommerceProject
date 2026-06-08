import {asyncHandler,apiError,apiResponse,OrderModel, NotificationModel,io} from "../../index.js";

const reviewProducts=asyncHandler(async(req,res)=>{
  try{
    const {orderId,items,action}=req.body;
    

    const order=await OrderModel.findById(orderId);
    if(!order){
        throw new apiError(404,"Order not found");
    }
   const selectedSet = new Set(items);

order.products = order.products.map((item) => {
  if (selectedSet.has(item.productId.toString())) {
    if(action==="accepted"){
    return {
      ...item,
      status: "accepted",
    };
  }else{
    return {
      ...item,
      status: "rejected",
    };
  }
}

if (item?.status==="pending") {
  
if(action==="rejected"){
    return {
      ...item,
      status: "accepted",
    };
  }else{
    return {
      ...item,
      status: "rejected",
    };
  }
}
return item
});
    
    const oldTotalPrice=order.totalPrice;
      const remainingTotalPrice =order?.products?.reduce((total,product)=>{
      
            if(product.status==="accepted"){
              return total+(product.priceAtPurchase*product.quantity);
            }
            return total;
        },0);

        order.totalPrice=remainingTotalPrice;
        if (order.paymentMethod!=="cod"&&order.paymentStatus==="completed") {
        //    const refundAmount = Number((oldTotalPrice - remainingTotalPrice).toFixed(2));
        // soon added refund amount to customer wallet  
        order.paymentStatus = "refunded";
        }

    const acceptedProducts = order.products.filter(
  p => p?.status === "accepted"
);

if (acceptedProducts.length === 0) {
  order.status = "cancelled";
  order.statusHistory.push({
    status: "cancelled",
    date: new Date(),
  });
} else {
  order.status = "processing";
  order.statusHistory.push({
    status: "processing",
    date: new Date(),
  });
}
const notification=await NotificationModel.create({
    recipient: order.userId,
    recipientModel: "User",
    type: "order",
    title:"Order updated",
    redirect: true,
    message:`Order with tracking number ${order.id} has been ${order?.status}`,
    data: {
        orderId: order.id,
        status: order?.status,
    },
})
    await order.save();
    res.status(200).json(new apiResponse(200,"Order cancelled successfully",order));
  }catch(err){
    console.log(err);
    throw new apiError(500,"Something went wrong");
  }
  })

export {reviewProducts}