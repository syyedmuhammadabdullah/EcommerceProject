import {asyncHandler,apiError,apiResponse,OrderModel,CartModel} from "../../index.js"
import {customAlphabet} from "nanoid";

const createOrder=asyncHandler(async(req,res)=>{
  
    
    const {shippingAddress,billingAddress,paymentMethod,cartProducts,sellerId,paymentId,paymentStatus}=req.body;
    
    if (!shippingAddress || !billingAddress || !paymentMethod || !cartProducts,!sellerId,!paymentId,!paymentStatus) {
        throw new apiError(400, "All fields are required");
    }
    const orderId = customAlphabet("1234567890", 6);
    const order = await OrderModel.create({
        userId: req.user._id,
        shippingAddress,
        billingAddress,
        paymentMethod,
        paymentId,
        paymentStatus,
        products: cartProducts.map((product) => ({
            productId: product.productId? product.productId : product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            sellerId: sellerId,
            tracking: {
                status: "processing",
                estimatedDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
                trackingNumber: orderId(),
                carrier: "FedEx"
            }
        })),
        orderId: orderId(),
        
    });
    
    order.totalPrice = order.products.reduce(
        (total, item) => Number((total + item.price).toFixed(2)),
        0
    );
    order.totalItems = order.products.length;
    await order.save();
    const cart = await CartModel.findOne({userId: req.user._id});
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

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