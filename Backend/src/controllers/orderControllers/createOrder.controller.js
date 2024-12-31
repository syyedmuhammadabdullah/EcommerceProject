import {asyncHandler,apiError,apiResponse,OrderModel,CartModel} from "../../index.js"
import {customAlphabet, nanoid} from "nanoid";

const createOrder=asyncHandler(async(req,res)=>{
  
    console.log("create order runs",req.body);
    
    const {shippingAddress,billingAddress,paymentMethod,cartProducts,sellerId,paymentId,paymentStatus}=req.body;
    
    if (!shippingAddress || !paymentMethod || !cartProducts,!sellerId,!paymentId,!paymentStatus) {
        throw new apiError(400, "All fields are required");
    }
    
    
    try {
        const orderId = customAlphabet("1234567890", 6);
        console.log("order is to be created",orderId());
    
            const order = await OrderModel.create({
                userId: req.user._id,
                sellerId,
                shippingAddress,
                billingAddress,
                paymentMethod,
                paymentId,
                paymentStatus,
                products: cartProducts.map((product) => ({
                    productId: product.productId,
                    quantity: product.quantity,
                    priceAtPurchase: product.price,
                    image:product.image,
                    name:product.name,
                    
                })),
                trackingNumber: orderId(),
                
            });
            
            order.totalPrice = order.products.reduce((total, product) => Number((total + (product.priceAtPurchase * product.quantity)).toFixed(2)), 0);
            order.totalItems = order.products.length;
            await order.save();
            const cart = await CartModel.findOne({userId: req.user._id});
            cart.items = [];
            cart.totalItems = 0;
            cart.totalPrice = 0;
            await cart.save();
    } catch (error) {
        console.log(error);
        
    }

       
  

    const updatedOrder =await OrderModel.aggregate([
        {
            $match:{userId:req.user._id}
        },
        {
            $unwind:"$products"
        },
        {
            $sort: { "createdAt": -1 },
          },
        {
            $skip:0
        },
        {
            $limit:10
        },
        {
            $group: {
              
                    _id: {
                        date: { $dateToString: { format: "%B %d, %Y", date: "$createdAt" } 
                  },
                       },
                    
                  count: { $sum: 1 },
                  orders: { $push: "$$ROOT" }
              }
        },
        {
            $sort:{"_id.date": -1}
        },
       
    ])
    res.status(201)
    .json(new apiResponse(201,"Order created successfully",updatedOrder))
})

export {createOrder};