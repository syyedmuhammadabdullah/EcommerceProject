import {apiError,apiResponse,asyncHandler,WishlistModel} from "../../index.js";

const removeItemFromWishlist=asyncHandler(async(req,res)=>{
    const {productId}=req.body;

    if(!productId){
        throw new apiError(400,"All fields are required")
    }
    const wishlist = await WishlistModel.findOneAndDelete({userId:req.user._id,productId:productId});
console.log("wishlist",wishlist);

    res.status(200)
    .json(new apiResponse(200,"Item removed from wishlist successfully",wishlist))
})

export {removeItemFromWishlist}