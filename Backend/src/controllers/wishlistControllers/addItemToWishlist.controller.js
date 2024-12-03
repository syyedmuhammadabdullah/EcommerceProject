import {apiError,apiResponse,asyncHandler,WishlistModel} from "../../index.js";


const addItemToWishlist=asyncHandler(async(req,res)=>{

    const {productId}=req.body;
console.log(productId);

    if(!productId){
        throw new apiError(400,"All fields are required")
    }
    console.log(req.user);
    
    const wishlist = await WishlistModel.findOne({userId:req.user._id});

    if (!wishlist) {
        await WishlistModel.create({userId:req.user._id})
        
    }

    wishlist.item.findIndex(item =>{

        if (item.productId.toString() == productId.toString()) {

            throw new apiError(400, "Product already exists in wishlist")
        }
        
    })

    wishlist.item.push({productId})
    wishlist.totalItems=wishlist.item.length
    await wishlist.save()

    let updatedwishlist = await WishlistModel.findOne({userId:req.user._id})
    .populate("item.productId")
    .select("name price discountPrice unitPrice subCategory image");	
    res.status(200)
    .json(new apiResponse(200,"Product added to wishlist successfully",updatedwishlist))

})

export {addItemToWishlist}