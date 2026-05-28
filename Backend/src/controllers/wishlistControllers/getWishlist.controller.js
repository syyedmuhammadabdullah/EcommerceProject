import {asyncHandler,WishlistModel,apiResponse,apiError} from "../../index.js";

const getWishlist=asyncHandler(async(req,res)=>{

    const wishlist = await WishlistModel.find({userId:req.user._id})
    .populate({path:"productId",select:"name image price _id discountPrice unitPrice"})

    res.status(200)
    .json(new apiResponse(200,"Wishlist found successfully",wishlist))
})

export {getWishlist}