// import {asyncHandler,apiError,apiResponse,OrderModel,CartModel} from "../../index.js"
// import {customAlphabet, nanoid} from "nanoid";

// const createOrder=asyncHandler(async(req,res)=>{
  
//     console.log("create order runs",req.body);
    
//     const {shippingAddress,billingAddress,paymentMethod,buyNowProduct,sellerId,paymentId,paymentStatus,quantity,cartProducts}=req.body;
//     console.log(quantity);
    
//     if (!shippingAddress || !paymentMethod, || !sellerId,) {
//         throw new apiError(400, "All fields are required");
//     }
    
    
    
//         const orderId = customAlphabet("1234567890", 6);
//         console.log("order is to be created",orderId());
     


//        if (buyNowProduct) {
//         const order = await OrderModel.create({
//             userId: req.user._id,
//             sellerId,
//             shippingAddress,
//             billingAddress,
//             paymentMethod,
//             paymentId,
//             paymentStatus,
//             products: buyNowProduct.map((product) => ({
//                 productId: product._id,
//                 quantity:product.quantity ? product.quantity : quantity,
//                 priceAtPurchase: product.discountPrice ? product.discountPrice : product.unitPrice,
//                 image:product.image,
//                 name:product.name,
                
//             })),
//             trackingNumber: orderId(),
            
//         });
//         if(cartProducts){
            
//         }

//    if (!order) {
//        throw new apiError(500, "Failed to create order");
       
//    }
// order.totalPrice = order.products.reduce((total, product) => Number((total + (product.priceAtPurchase * product.quantity)).toFixed(2)), 0);
// order.totalItems = order.products.length;
// await order.save();
//        }


//      if (cartProducts) {
//         cartProducts.items.forEach((item) => {
//             const order = await OrderModel.create({
//                 userId: req.user._id,
//                 sellerId: item.sellerId._id,
//                 shippingAddress,
//                 billingAddress,
//                 paymentMethod,
//                 paymentId,
//                 paymentStatus,
//                 products: item.items.map((product) => ({
//                     productId: product._id,
//                     quantity:product.quantity ? product.quantity : quantity,
//                     priceAtPurchase: product.discountPrice ? product.discountPrice : product.unitPrice,
//                     image:product.image,
//                     name:product.name,
                    
//                 })),
//                 trackingNumber: orderId(),
                
//             });
           
    
//        if (!order) {
//            throw new apiError(500, "Failed to create order");
           
//        }
//     order.totalPrice = order.products.reduce((total, product) => Number((total + (product.priceAtPurchase * product.quantity)).toFixed(2)), 0);
//     order.totalItems = order.products.length;
//     await order.save();
           
//         })
//     }
     



//           if (!buyNowProduct) {
//             const cart = await CartModel.findOne({userId: req.user._id});
//             cart.items = [];
//             cart.totalItems = 0;
//             cart.totalPrice = 0;
//             await cart.save();
//           }
   

       
  

//     res.status(201)
//     .json(new apiResponse(201,"Order created successfully",order));
// })

// export {createOrder};



import { asyncHandler, apiError, apiResponse, OrderModel, CartModel } from "../../index.js";
import { customAlphabet } from "nanoid";

const createOrder = asyncHandler(async (req, res) => {
  console.log("create order runs", req.body);

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
  console.log(quantity);

  if (!shippingAddress || !paymentMethod || !sellerId) {
    throw new apiError(400, "All fields are required");
  }

  // Generate order ID
  const orderId = customAlphabet("1234567890", 6);
  console.log("order is to be created", orderId());


  const createdOrders = [];

  // Case 1: Buy Now Product Handling
  if (buyNowProduct) {
    console.log("buyNowProduct found");
    
    const order = await OrderModel.create({
      userId: req.user._id,
      sellerId,
      shippingAddress,
      billingAddress,
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

    createdOrders.push(order);
  }

  // Case 2: Cart Products Handling
  console.log("cartProducts", cartProducts);
  
  if (cartProducts) {
    // Iterate over each seller's items in the cartProducts array
    console.log("cartProducts found");
    
    for (const item of cartProducts.items) {
      const sellerProducts = item.items; // Products for this seller
      const sellerId = item.sellerId._id; // Seller's ID
      
            const order = await OrderModel.create({
                userId: req.user._id,
                sellerId: sellerId,
                shippingAddress,
                billingAddress,
                paymentMethod,
                paymentId,
                paymentStatus,
                products: sellerProducts.map((product) => ({
                  productId: product._id,
                  quantity: product.quantity || quantity,
                  priceAtPurchase: product.discountPrice || product.unitPrice,
                  image: product.image,
                  name: product.name
                })),
                trackingNumber: orderId(),
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
});

export { createOrder };
