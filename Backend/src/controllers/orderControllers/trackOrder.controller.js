import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const trackOrder=asyncHandler(async(req,res)=>{	
    const {orderId}=req.query;
    console.log("order id",req.query);
    
    const order=await OrderModel.findById(orderId);
    if(!order){
        throw new apiError(404,"Order not found");
    }
    
        res.status(200)
    .json(new apiResponse(200,"Order found successfully",order));
    
 

    
})

export {trackOrder}