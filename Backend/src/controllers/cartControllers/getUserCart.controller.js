import {apiResponse,asyncHandler,CartModel} from "../../index.js";


const getUserCart=asyncHandler(async(req,res)=>{

    const cart = await CartModel.findOne({userId:req.user._id})
    .populate('items.sellerId', 'storeDetails');

    if (!cart) {
        CartModel.create({userId:req.user._id})
        
    }

    res.status(200)
    .json(new apiResponse(200,"Cart found successfully",cart))

})

export {getUserCart}