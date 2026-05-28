import {apiError,apiResponse,asyncHandler,WishlistModel} from "../../index.js";


const addItemToWishlist=asyncHandler(async(req,res)=>{

    const {productId}=req.body;

    if(!productId){
        throw new apiError(400,"All fields are required")
    }
   
    const wishList = await WishlistModel.findOneAndUpdate(
   {
      userId: req.user._id,
      productId
   },

   {
      $setOnInsert: {
         userId: req.user._id,
         productId,
         createdAt: new Date()
      }
   },

   {
      upsert: true,
      new: true
   }
).populate({path:"productId",select:"name image price _id discountPrice unitPrice"});
    res.status(200)
    .json(new apiResponse(200,"Item added to wishlist successfully",wishList))

    
})

export {addItemToWishlist}