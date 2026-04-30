import { asyncHandler, apiError, apiResponse, OrderModel, CartModel,io,NotificationModel, AddressModel, } from "../../index.js";
import { customAlphabet } from "nanoid";

const createOrder = asyncHandler(async (req, res) => {
  console.log("create order runs", req.body);
try{
  const {
    shippingAddress,
    billingAddress,
    paymentMethod,
    buyNowProduct,
    sellerId,
    paymentId,
    paymentStatus,
    quantity,
    cartProducts
  } = req.body;

  if (!shippingAddress || !paymentMethod || !sellerId) {
    throw new apiError(400, "All fields are required");
  }

  // Generate order ID
  const orderId = customAlphabet("1234567890", 6);

  const isBillingSameAsShipping = JSON.stringify(shippingAddress) === JSON.stringify(billingAddress);
  let billAddress;

  const shipAddress=await AddressModel.findById(shippingAddress);
  if(!shipAddress){
    throw new apiError(404,"Shipping address not found")
  }
  
  if (isBillingSameAsShipping) {
    billAddress = shipAddress;
  }else{
      const address=await AddressModel.findById(billingAddress);
      if(!address){
        throw new apiError(404,"Billing address not found")
      }
      billAddress = address;
  }
console.log("ship address",shipAddress,"bill address",billAddress,"is billing same as shipping?",isBillingSameAsShipping);

  const createdOrders = [];


  // Case 1: Buy Now Product Handling
  if (buyNowProduct) {
    console.log("buyNowProduct found");
    
    const order = await OrderModel.create({
      userId: req.user._id,
      sellerId,
      shippingAddress: shipAddress,
      billingAddress: billAddress,
      paymentMethod,
      paymentId,
      paymentStatus,
      products: buyNowProduct.map((product) => ({
        productId: product._id,
        quantity: product.quantity || quantity,
        priceAtPurchase: product.discountPrice || product.unitPrice,
        image: product.image,
        name: product.name
      })),
      trackingNumber: orderId(),
      statusHistory: [
        {
          status: "pending",
          date: new Date(),
        },
      ],
    });

    if (!order) {
      throw new apiError(500, "Failed to create order");
    }

    // Calculate total price for the buy-now order
    order.totalPrice = order.products.reduce((total, product) => 
      Number((total + (product.priceAtPurchase * product.quantity)).toFixed(2)), 0
    );
    order.totalItems = order.products.length;
    await order.save();
      const notification=await NotificationModel.create({
    recipient: sellerId,
    recipientModel: "Seller",
    type: "order",
    title:"New order",
    message: "New order Received",
    redirect: true,
    data: {
      orderId: order._id,
    },
  })

    io.to(sellerId).emit("notification", notification);

    createdOrders.push(order);
  }

  // Case 2: Cart Products Handling
  
  if (cartProducts &&!buyNowProduct) {
    // Iterate over each seller's items in the cartProducts array
    console.log("cartProducts found", cartProducts);
    
    for (const item of cartProducts.items) {
      const sellerProducts = item.items; // Products for this seller
      const sellerId = item.sellerId; // Seller's ID
      console.log("the seller products are",sellerProducts);
      
            const order = await OrderModel.create({
                userId: req.user._id,
                sellerId: sellerId,
                shippingAddress: shipAddress,
                billingAddress: billAddress,
                paymentMethod,
                paymentId,
                paymentStatus,
                products: sellerProducts.map((product) => ({
                  productId: product.productId,
                  quantity: product.quantity || quantity,
                  priceAtPurchase: product.discountPrice || product.unitPrice,
                  image: product.image,
                  name: product.name
                })),
                trackingNumber: orderId(),
                statusHistory: [
                  {
                    status: "pending",
                    date: new Date(),
                  },
                ],
              });
    
   

      if (!order) {
        throw new apiError(500, "Failed to create order");
      }

      // Calculate total price for this seller's order
      order.totalPrice = order.products.reduce((total, product) => 
        Number((total + (product.priceAtPurchase * product.quantity)).toFixed(2)), 0
      );
      order.totalItems = order.products.length;
      await order.save();
        const notification=await NotificationModel.create({
    recipient: sellerId,
    recipientModel: "Seller",
    type: "order",
    title:"New order",
    message: "New order Received",
    redirect: true,
    data: {
      orderId: order._id,
    },
  })

    io.to(sellerId).emit("notification", notification);

      createdOrders.push(order);
    }
  }

  // Clear the cart if it's a cart order
  if (!buyNowProduct) {
    const cart = await CartModel.findOne({ userId: req.user._id });
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();
  }



  res.status(201)
    .json(new apiResponse(201, "Order created successfully", createdOrders));
} catch (error) {
  console.error("Error creating order:", error);
  throw new apiError(500, "An error occurred while creating the order");
}
});

export { createOrder };
