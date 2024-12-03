import {apiError,apiResponse,asyncHandler,ProductReviewModel} from "../../index.js";
import mongoose from "mongoose";
const getProductReview=asyncHandler(async(req,res)=>{
    const { productId, rating, page = 1, limit = 10 } = req.query;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    // Build filters dynamically
    const filters = {
        productId:new mongoose.Types.ObjectId(productId) // Ensure productId is ObjectId
    };
    
    if (rating) {
        filters.rating = Number(rating);
        }
    const productReviews=await ProductReviewModel.aggregate([
        {
            $match: { productId: filters.productId } // First match productId
        },
        {
            $facet: {
                reviews: [
                    { 
                        $match: rating ? { rating: Number(rating) } : {} // Apply rating filter to reviews only
                    },
                    { $sort: { createdAt: -1 } }, // Sort by date if necessary
                    { $skip: (page - 1) * limit }, // Skip reviews based on current page
                    { $limit: limit } // Limit the number of reviews per page
                ],
                ratingsCount: [
                    {
                        $group: {
                            _id: "$rating", // Group by rating
                            count: { $sum: 1 } // Count the reviews for each rating
                        }
                    },
                    {
                        $sort: { _id: -1 } // Sort by rating in descending order
                    }
                ]
            }
        },
        {
            $addFields: {
                ratingsCount: {
                    $map: {
                        input: [1, 2, 3, 4, 5], // Include all ratings from 1 to 5
                        as: "rating", 
                        in: {
                            $mergeObjects: [
                                { _id: "$$rating" }, // Include the rating itself
                                {
                                    count: {
                                        $let: {
                                            vars: {
                                                found: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$ratingsCount",
                                                                as: "item",
                                                                cond: { $eq: ["$$item._id", "$$rating"] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: {
                                                $ifNull: ["$$found.count", 0] // If no review, set count to 0
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ])
    res.status(200).json(new apiResponse(200,"Product reviews fetched successfully",productReviews))
})
export {getProductReview}