import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const trackOrder=asyncHandler(async(req,res)=>{	
    const {trackingNumber,orderId}=req.query;
    const query={};
    if(trackingNumber) query.trackingNumber=trackingNumber;
    if(orderId) query._id=orderId;
    console.log("order id",req.query);
    
    const order=await OrderModel.findOne(query);
    if(!order){
        throw new apiError(404,"Order not found");
    }
    
        res.status(200)
    .json(new apiResponse(200,"Order found successfully",order));
    
 

    
})

export {trackOrder}