import { apiError,apiResponse,asyncHandler,CartModel,CartItemModel } from "../../index.js";


const removeItemFromCart=asyncHandler(async(req,res)=>{
    const {productId,userId}=req.body

    if(!productId || !userId){
        throw new apiError(400,"All fields are required")
    }
console.log(userId);

    const cart = await CartModel.findOne({userId});

    if (!cart) {
        throw new apiError(404, "Cart not found");
        
    }
    await CartItemModel.findOneAndDelete(productId)
    cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString())

    cart.totalItems=cart.items.length
    cart.totalPrice=cart.items.reduce((acc,item)=>Number((acc+item.price).toFixed(2)),0)
    await cart.save()
    let updatedcart = await CartModel.findOne({userId});
    res.status(200)
    .json(new apiResponse(200,"Item removed from cart successfully",updatedcart))
})

export {removeItemFromCart}