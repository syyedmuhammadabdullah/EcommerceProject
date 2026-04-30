import {apiError,apiResponse ,asyncHandler,OrderModel,io,NotificationModel,ProductModel} from "../../index.js";

const updateItemStatus = asyncHandler(async (req, res) => {
 console.log("update item status runs",req.body,req.params);
 
    const { orderId, itemId } = req.params;
  const { status } = req.body;
  
  const order = await OrderModel.findById(orderId);
  if (!order) throw new apiError(404, "Order not found");
  
  const item = order.products.find(i => i.productId.toString() === itemId);
  console.log(item,itemId);
  if (!item) throw new apiError(404, "Item not found");

  if (item.status === status) {
    throw new apiError(400, "Item status already updated");
  }

  // ✅ ROLE BASED AUTH
  const allowedTransitions = {
    // seller: ["accepted", "rejected"],
    user: ["canncelled"],
  };

  if (req.user&&status!=="canncelled") {
    throw new apiError(403, "Not allowed");
  }

  // ✅ STOCK
  if (status === "confirmed") {
    const product = await ProductModel.findById(item.productId);

    if (!product || product.currentStock < item.quantity) {
      console.log(product,item.quantity);
      
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

  // ✅ UPDATE STATUS
  item.status = status;

  // ✅ TOTAL RECALC
  order.totalAmount = order.products.reduce((acc, curr) => {
    if (curr.status !== "rejected") {
      return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0);

  // ✅ OPTIONAL REFUND TRACK
  if (status === "rejected" &&order.paymentStatus === "completed") {
    
    item.refundedAmount += item.price * item.quantity;
    order.totalAmount -= item.price * item.quantity;
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