import { apiError,apiResponse,asyncHandler,CartModel,CartItemModel } from "../../index.js";
import mongoose from "mongoose";


const updateCartItem=asyncHandler(async(req,res)=>{
    const {productId,quantity,unitPrice}=req.body
    console.log(productId,quantity,unitPrice);
    
    const productIdObjectId =new mongoose.Types.ObjectId(productId);
    console.log(productIdObjectId);
    
    if(!productId || !quantity || !unitPrice){
        throw new apiError(400,"All fields are required")
    }

    const cart = await CartModel.findOneAndUpdate(
        { userId:req.user._id },
        { $set: { "items.$[element].quantity": quantity,"items.$[element].price":Number((quantity*unitPrice).toFixed(2)) } },
        { arrayFilters: [{ "element.productId": productIdObjectId }] ,new:true}
      )
    if (!cart) {
        throw new apiError(404, "Cart not found");
        
    }
    
   await CartItemModel.updateOne({productId},{quantity,price:Number((quantity*unitPrice).toFixed(2))})

  

    cart.totalItems=cart.items.length
    cart.totalPrice=cart.items.reduce((acc,item)=>Number((acc+item.price).toFixed(2)),0)
    await cart.save()
    
    let updatedcart = await CartModel.findOne({userId:req.user._id});
    console.log(updatedcart);
    
    res.status(200)
    .json(new apiResponse(200,"Cart updated successfully",updatedcart))

})
export {updateCartItem}