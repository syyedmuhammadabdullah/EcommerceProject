import { asyncHandler, apiError, apiResponse, ProductReviewModel, ProductModel } from "../../index.js";

const updateProductReview = asyncHandler(async (req, res) => {
    const { review, reviewId, rating, productId } = req.body;
    console.log(review, reviewId, rating);
    
    // Check if all required fields are provided
    if (!reviewId || !rating || !productId) {
        throw new apiError(400, "All fields are required");
    }

    // Find the existing review and product
    const oldReview = await ProductReviewModel.findById(reviewId);
    const product = await ProductModel.findById(productId);

    if (!oldReview) {
        throw new apiError(404, "Review not found");
    }
    if (!product) {
        throw new apiError(404, "Product not found");
    }

    // Update the product's totalRating if the review rating has changed
    if (oldReview.rating !== rating) {
        // Update the totalRating
        product.totalRating += (rating - oldReview.rating); // Add the new rating and subtract the old one
    }

    // Update the review comment if provided
    if (review) {
        oldReview.comment = review;
    }

    // Update the review rating
    oldReview.rating = rating;

    // Save the updated review
    await oldReview.save();

    // Recalculate the product's average rating
    product.averageRating = product.totalRating / product.ratingCount;

    // Save the updated product information
    await product.save();

    res.status(200).json(new apiResponse(200, "Product review updated successfully", oldReview));
});

export { updateProductReview };
