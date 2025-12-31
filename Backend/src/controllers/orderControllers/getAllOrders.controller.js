import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";

const getAllOrders=asyncHandler(async(req,res)=>{
    const page=req.query.page||1;
    const limit=req.query.limit||10;
    const orders=await OrderModel.find().skip((page-1)*limit).limit(limit);
    if(!orders){
        return res.status(400).json(new apiError(400,"Orders not found"));
    }
    res.status(200).json(new apiResponse(200,"Orders found successfully",orders));
})
export {getAllOrders}