import {apiError,apiResponse ,asyncHandler,OrderModel,io,NotificationModel,ProductModel, SellerTransactionModel, SellerWalletModel} from "../../index.js";

const updateItemStatus = asyncHandler(async (req, res) => {
 console.log("update item status runs",req.body,req.params);
 
    const { orderId } = req.params;
  const { status,items } = req.body;
  
  if (!orderId,status,items) {
    throw new apiError(400, "All fields are required");
  }

  const order = await OrderModel.findById(orderId);
  if (!order) throw new apiError(404, "Order not found");
  
 order.products = order.products.map(item => {
  const selectedSet = new Set(items);
  if (selectedSet.has(item.productId.toString())) {
    return {
      ...item,
      status// ya "rejected", jo bhi chaho
    };
  }
  return item;
});
 

  // ✅ ROLE BASED AUTH
  const allowedTransitions = {
    // seller: ["accepted", "rejected"],
    user: ["cancelled","requested"],
  };

  if (req.user&& !["cancelled","requested"].includes(status)) {
    // console.log(req.user,);
    
    throw new apiError(403, "Not allowed");
  }

  // ✅ STOCK
  if (status === "confirmed") {
    const product = await ProductModel.findById(item.productId);

    if (!product || product.currentStock < item.quantity) {
      
      throw new apiError(400, "Insufficient stock");
    }

    product.currentStock -= item.quantity;
   

    if (product.currentStock<=product.lowStock) {
        const lowStockNotification = await NotificationModel.create({
          recipientModel:"Seller",
            recipient: product.seller,
            message: `Your product ${product.name.slice(0, 10)}... is running low on stock`,
            type: "product",
            title: "Low Stock Alert",
            redirect: true,
            data: { productId: product._id }
          });
          io.to(product.seller.toString()).emit("notification", lowStockNotification);        
    }
    if (product.currentStock===0) {
        product.status="out of stock";
        const lowStockNotification = await NotificationModel.create({
          recipientModel:"Seller",
            recipient: product.seller,
            redirect: true,
            message: `Your product ${product.name.slice(0, 10)}... is out of stock`,
            type: "product",
            title: "Low Stock Alert",
            data: { productId: product._id }
          });
          io.to(product.seller.toString()).emit("notification", lowStockNotification);
     
    }
     await product.save();
  }
  // ✅ TOTAL RECALC
  order.totalAmount = order.products.reduce((acc, curr) => {
    if (curr.status !== "rejected") {
      return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0);

  // ✅ OPTIONAL REFUND TRACK
  if (status === "rejected" &&order.paymentStatus === "completed") {
  const amount=order.products.reduce((acc, curr) => {
    if (curr.status === "rejected") {
      return acc + curr.price * curr.quantity;
    }
  })
    await SellerTransactionModel.create({
      walletId: order.walletId,
      sellerId: order.sellerId,
      amount: amount,
      type: "refund",
      status: "completed",
      createdAt: Date.now(),
    })
  }

  await order.save();

  // ✅ NOTIFICATION
  const notification = await NotificationModel.create({
    recipientModel:status==="canncelled"?"Seller":"User",
    recipient:status==="canncelled"? order.sellerId:order.userId,
    message: `Your order item status is updated to ${status}`,
    type: "order",
    title: "Order Update",
    data: { orderId, itemId, status },
    redirect: true
  });

  if (status === "cancelled") {
    io.to(order.sellerId.toString()).emit("notification", notification);
  } else {
    io.to(order.userId.toString()).emit("notification", notification);
  }

  res.status(200).json(
    new apiResponse(200, "Item status updated successfully", order)
  );
});
export {updateItemStatus}