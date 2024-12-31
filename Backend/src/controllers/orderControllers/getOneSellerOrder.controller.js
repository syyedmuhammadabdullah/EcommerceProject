import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const getOneSellerOrder=asyncHandler(async(req,res)=>{
    console.log("get one seller order runs",req.query);
    const order=await OrderModel.findById(req.query.orderId)
    .populate({path:"userId",select:"fullName phone email -_id"}).populate({path:"shippingAddress"}).populate({path:"billingAddress"});
    if(!order){
        throw new apiError(404,"Order not found");
    }
    res.status(200).json(new apiResponse(200,"Order found successfully",order))
})
export {getOneSellerOrder}