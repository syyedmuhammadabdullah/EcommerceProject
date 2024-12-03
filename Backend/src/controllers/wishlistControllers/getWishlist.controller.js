import {asyncHandler,WishlistModel,apiResponse,apiError} from "../../index.js";

const getWishlist=asyncHandler(async(req,res)=>{

    const wishlist = await WishlistModel.findOne({userId:req.user._id})
    .populate({path:"item.productId",select:"name image price _id discountPrice unitPrice"})
    

    if (!wishlist) {
        throw new apiError(404, "Wishlist not found");
    }

    res.status(200)
    .json(new apiResponse(200,"Wishlist found successfully",wishlist))
})

export {getWishlist}