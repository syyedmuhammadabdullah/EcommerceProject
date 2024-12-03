// import mongoose from 'mongoose';
// import { apiError, apiResponse, asyncHandler, ProductReviewModel, OrderModel } from "../../index.js";

// const getUserProductReview = asyncHandler(async (req, res) => {

//   const productReviews = await OrderModel.aggregate([
//     {
//       $match: {
//         userId:new mongoose.Types.ObjectId(req.user._id), // Filter orders by userId
//         "products.tracking.status": "delivered", // Filter orders with delivered status
//       },
//     },
//     {
//       $unwind: "$products", // Unwind the products array to process each product individually
//     },
//     {
//       $lookup: {
//         from: "productreviewmodels", // Join with reviews collection (ensure correct collection name)
//         localField: "products.productId", // Match productId from orders
//         foreignField: "productId", // Match productId in reviews collection
//         as: "productReview", // The field that will contain the review data
//       },
//     },
//     {
//       $unwind: { path: "$productReview", preserveNullAndEmptyArrays: true }, // Unwind product reviews, keeping empty arrays if no review exists
//     },
//     {
//       $project: {
//         productId: "$products.productId", // Extract productId
//         userId: 1, // Keep the userId field
//         productName: "$products.name", // Extract product name
//         status: "$products.tracking.status", // Include order status
//         comment: "$productReview.comment", // Extract the review comment (if it exists)
//         rating: "$productReview.rating", // Extract the review rating (if it exists)
//         reviewId: "$productReview._id", // Extract the review rating (if it exists)
//       },
//     },
//   ]);

//   // Return the product reviews
//   res.status(200).json(new apiResponse(200, "Product reviews fetched successfully", productReviews));
// });

// export { getUserProductReview };




import mongoose from 'mongoose';
import { apiError, apiResponse, asyncHandler, ProductReviewModel, OrderModel } from "../../index.js";

const getUserProductReview = asyncHandler(async (req, res) => {
  const productReviews = await OrderModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(req.user._id), // Filter orders by userId
        "products.tracking.status": "delivered", // Filter orders with delivered status
      },
    },
    {
      $unwind: "$products", // Unwind the products array to process each product individually
    },
    {
      $lookup: {
        from: "productreviewmodels", // Join with reviews collection (ensure correct collection name)
        let: { productId: "$products.productId" }, // Pass the productId as a variable
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$productId", "$$productId"] }, // Match the productId
                  { $eq: ["$userId", new mongoose.Types.ObjectId(req.user._id)] }, // Match the userId
                ],
              },
            },
          },
        ],
        as: "productReview", // The field that will contain the review data
      },
    },
    {
      $unwind: { path: "$productReview", preserveNullAndEmptyArrays: true }, // Unwind product reviews, keeping empty arrays if no review exists
    },
    {
      $project: {
        productId: "$products.productId", // Extract productId
        userId: 1, // Keep the userId field
        productName: "$products.name", // Extract product name
        status: "$products.tracking.status", // Include order status
        comment: "$productReview.comment", // Extract the review comment (if it exists)
        rating: "$productReview.rating", // Extract the review rating (if it exists)
        reviewId: "$productReview._id", // Extract the review ID (if it exists)
      },
    },
  ]);

  // Return the product reviews
  res.status(200).json(new apiResponse(200, "Product reviews fetched successfully", productReviews));
});

export { getUserProductReview };
