import {asyncHandler,updateProductsStatus,apiError,apiResponse,OrderModel, SellerTransactionModel, SellerWalletModel, NotificationModel, io} from "../../index.js";

const cancelProducts=asyncHandler(async(req,res)=>{
    const {orderId,items}=req.body;

    const order=await OrderModel.findById(orderId);
    if(!order){
        throw new apiError(404,"Order not found");
    }
    let completelyCancelled=items.length===order.products.length;

    updateProductsStatus(order,items,"cancelled");

    // const cancelledAmount=order.products.reduce((total,product)=>{
    //     if(product.status==="cancelled"){
    //         return total+(product.priceAtPurchase*product.quantity);
    //     }
    // })
    
    if(completelyCancelled){
        order.status="cancelled";
        order.statusHistory.push({
            status:"cancelled",
            date:new Date()
        });
        if (order.paymentMethod!=="cod"&&order.paymentStatus==="completed") {
            
            order.paymentStatus = "refunded";
        }

        const notification=await NotificationModel.create({
            recipient: order.sellerId,
            recipientModel: "Seller",
            type: "order",
            title:"Order updated",
            redirect: true,
            message:`Order with tracking number ${order.id} has been cancelled`,
            data: {
              orderId: order.id,
            },
        })
        io.to(order.sellerId.toString()).emit("notification", notification);
    }else{
        console.log(order);
        
        const oldTotalPrice=order.totalPrice;
      const remainingTotalPrice =order.products.reduce((total,product)=>{
            if(product.status==="cancelled"){
                return total;
            }
            return total+(product.priceAtPurchase*product.quantity);
        },0);

        order.totalPrice=remainingTotalPrice;
        if (order.paymentMethod!=="cod"&&order.paymentStatus==="completed") {
        //    const refundAmount = Number((oldTotalPrice - remainingTotalPrice).toFixed(2));
        // soon added refund amount to customer wallet  
        order.paymentStatus = "refunded";
        }
    }
    await order.save();
    res.status(200).json(new apiResponse(200,"Order cancelled successfully",order));
})
export {cancelProducts}