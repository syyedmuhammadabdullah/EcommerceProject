import {apiError,apiResponse,asyncHandler,CartModel,CartItemModel, ProductModel} from "../../index.js";

const addItemToCart=asyncHandler(async(req,res)=>{
    const {productId,quantity,userId,unitPrice}=req.body
    console.log(req.body);
    
    if(!productId || !quantity || !userId || !unitPrice){
        throw new apiError(400,"All fields are required")
    }

    const cart = await CartModel.findOne({userId});
    const product= await ProductModel.findById(productId)
    if (!product) {
        throw new apiError(404, "Product not found");
    }
    console.log(product);
    
    const {name,image}=product;
    if (!cart) {
        throw new apiError(404, "Cart not found");
        
    }

    cart.items.findIndex(item =>{
       if (item.productId.toString() == productId.toString()) {
           throw new apiError(400, "Product already exists in cart")
        }
        
    })
   let item = await CartItemModel.create({productId,name,unitPrice,image,quantity,price:Number((quantity*unitPrice).toFixed(2))})
    cart.items.push(item)
    cart.totalItems=cart.items.length
    cart.totalPrice=cart.items.reduce((acc,item)=>Number((acc+item.price).toFixed(2)),0)
    await cart.save()

    const updatedCart = await CartModel.findOne({userId});

    res.status(200).json(new apiResponse(200,"Product added to cart",updatedCart))

})

export {addItemToCart}