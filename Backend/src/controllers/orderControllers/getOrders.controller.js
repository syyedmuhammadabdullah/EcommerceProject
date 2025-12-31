import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const getOrders=asyncHandler(async(req,res)=>{
    const page=req.query.page||1;
    const limit=req.query.limit||10;
    // const orders=await OrderModel.find({userId:req.user._id});
    const orders=await OrderModel.find({userId:req.user._id})
    .populate({path:"sellerId", select:"storeDetails"}).skip((page-1)*limit).limit(limit);

    res.status(200)
    .json(new apiResponse(200,"Orders found successfully",orders))

})

export {getOrders}