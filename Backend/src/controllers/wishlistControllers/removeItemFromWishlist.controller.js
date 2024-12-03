import {apiError,apiResponse,asyncHandler,WishlistModel} from "../../index.js";

const removeItemFromWishlist=asyncHandler(async(req,res)=>{
    const {productId}=req.body;

    if(!productId){
        throw new apiError(400,"All fields are required")
    }
    const wishlist = await WishlistModel.findOne({userId:req.user._id});

    if (!wishlist) {

        throw new apiError(404, "Wishlist not found");
        }

    wishlist.item = wishlist.item.filter(item => item.productId.toString() !== productId.toString())

    wishlist.totalItems=wishlist.item.length

    await wishlist.save()

    let updatedwishlist = await WishlistModel.findOne({userId:req.user._id})
    .populate({path:"item.productId",select:"name image price _id"})
    res.status(200)
    .json(new apiResponse(200,"Item removed from wishlist successfully",updatedwishlist))
})

export {removeItemFromWishlist}