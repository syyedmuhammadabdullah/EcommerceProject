import {apiError,asyncHandler,apiResponse,OrderModel} from "../../index.js";

const getSellerOrders=asyncHandler(async(req,res)=>{
    console.log("get seller orders runs",req.seller.sellerId);

    const totalOrders = await OrderModel.countDocuments({ sellerId: req.seller.sellerId });
      const total = totalOrders || 0;
      console.log("total orders",total);
    
    const orders=await OrderModel.find({ sellerId: req.seller.sellerId })
    .populate({path:"userId",select:"fullName -_id"}).skip(0).limit(10);
    if (!orders) {
        throw new apiError(404,"Orders not found");
    }
    
    res.status(200).json(new apiResponse(200,"Orders found successfully",orders,total))
})
export {getSellerOrders}