import {asyncHandler,apiError,apiResponse,ProductReviewModel, ProductModel} from "../../index.js";


const createProductReview=asyncHandler(async(req,res)=>{
    const {productId,rating,comment}=req.body;
    console.log(typeof rating);
    if(!productId || !rating ){
        throw new apiError(400,"All fields are required")
    }
    const productReview=await ProductReviewModel.create({
        productId,
        rating,
        comment:comment ? comment : undefined,
        userId:req.user._id
    })
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

    res.status(201).json(new apiResponse(201,"Product review created successfully",productReview))
})
export {createProductReview}