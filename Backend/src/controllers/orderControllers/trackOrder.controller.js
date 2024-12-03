import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const trackOrder=asyncHandler(async(req,res)=>{	
    const {orderId,trackingNumber}=req.query;
    console.log("the body is ",req.query);
    
   

    if (trackingNumber) {

      const   order=await OrderModel.
      aggregate([
        {
          $match: { "products.tracking.trackingNumber": trackingNumber }
        },
        {$project:{
           createdAt:1,
           updatedAt:1,
            product:{
                $arrayElemAt:[
                    {
                        $filter:{
                            input:"$products",
                            as:"product",
                            cond:{ $eq:["$$product.tracking.trackingNumber",trackingNumber] }                            
                        }
                    },0
                ]
            }
        }}
      ])





      console.log("tracking number order is ",order);
      
      res.status(200)
    .json(new apiResponse(200,"Order found successfully",order));

    }

    if (orderId) {
       const  order=await OrderModel.findOne({orderId})
       .populate("shippingAddress")
       .populate("billingAddress")
       console.log("order is ",order.userId,req.user._id);
       
       if(order.userId.toString()!==req.user._id.toString()){
           throw new apiError(404,"Order not found")
       }
        res.status(200)
    .json(new apiResponse(200,"Order found successfully",order));
    }
 

    
})

export {trackOrder}