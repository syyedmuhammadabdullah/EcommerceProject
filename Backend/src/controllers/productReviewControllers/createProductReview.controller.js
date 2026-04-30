import {asyncHandler,apiError,apiResponse,ProductReviewModel, ProductModel, io, NotificationModel} from "../../index.js";


const createProductReview=asyncHandler(async(req,res)=>{
    const {productId,rating,comment}=req.body;
    if(!productId || !rating ){
        throw new apiError(400,"All fields are required")
    }
    await ProductReviewModel.updateOne(
  { productId, userId: req.user._id }, // filter
  {
    $setOnInsert: {
      productId,
      rating,
      comment: comment || undefined,
      userId: req.user._id
    }
  },
  { upsert: true }
);
    const product = await ProductModel.findById(productId);

// Increment totalRating and ratingCount
product.totalRating += Number(rating);
product.ratingCount += 1;
// Recalculate averageRating
product.averageRating = product.totalRating / product.ratingCount;
switch (rating) {
    case 1:
        product.oneStars += 1;
        break;
    case 2:
        product.twoStars += 1;
        break;
    case 3:
        product.threeStars += 1;
        break;
    case 4:
        product.fourStars += 1;
        break;
    case 5:
        product.fiveStars += 1;
        break;

}
product.save()
    const notificationMessage = `Your product "${product.name}" has received a new review with a rating of ${rating} stars.`;
    const notification = await NotificationModel.create({
        recipientModel: "Seller",
        recipient: product.seller,
        type: "review",
        title: "New Product Review",
        message: notificationMessage,
        redirect: true,
        data: {
            productId: product._id,
            reviewId: productReview._id,
        },
    });
    io.to(product.seller.toString()).emit("notification", notification);
    res.status(201).json(new apiResponse(201,"Product review created successfully",productReview))
})
export {createProductReview}