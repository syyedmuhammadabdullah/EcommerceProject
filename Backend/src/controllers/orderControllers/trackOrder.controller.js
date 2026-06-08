import {apiError,apiResponse,asyncHandler,OrderModel, ProductReviewModel} from "../../index.js"

// const trackOrder=asyncHandler(async(req,res)=>{	
//     const {trackingNumber,orderId}=req.query;
//     const query={};
//     if(trackingNumber) query.trackingNumber=trackingNumber;
//     if(orderId) query._id=orderId;
//     console.log("order id",req.query);
    
//     const order=await OrderModel.findOne(query);
//     if(!order){
//         throw new apiError(404,"Order not found");
//     }
    
//         res.status(200)
//     .json(new apiResponse(200,"Order found successfully",order));
     
// })


const trackOrder = asyncHandler(async (req, res) => {
  const { trackingNumber, orderId } = req.query;

  const query = {};
  if (trackingNumber) query.trackingNumber = trackingNumber;
  if (orderId) query._id = orderId;

  const order = await OrderModel.findOne(query);

  if (!order) {
    throw new apiError(404, "Order not found");
  }

  // 🔥 IMPORTANT: logged-in user
  const userId = req.user?._id;

  let productsWithReview = order.products;

  // ✅ Sirf tab check karo jab user available ho
  if (userId) {
    const productIds = order.products.map(p => p.productId);

    // 🔥 Single optimized query
    const reviews = await ProductReviewModel.find({
      userId,
      productId: { $in: productIds }
    }).select("productId rating comment");

    // 🔥 Map for fast lookup
    const reviewMap = {};
    reviews.forEach(r => {
      reviewMap[r.productId.toString()] = r;
    });

    // 🔥 Merge into products
    productsWithReview = order.products.map(p => {
      const review = reviewMap[p.productId.toString()];

      return {
        ...p.toObject?.() || p,
        isReviewed: !!review,
        review: review || null
      };
    });
  }

  // 🔥 Final response
  const finalOrder = {
    ...order.toObject(),
    products: productsWithReview
  };

  res.status(200).json(
    new apiResponse(200, "Order found successfully", finalOrder)
  );
});



export {trackOrder}