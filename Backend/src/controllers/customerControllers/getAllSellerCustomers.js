import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";
import mongoose from "mongoose";

const getAllSellerCustomers=asyncHandler(async(req,res)=>{
  const sellerId=req.seller.sellerId;
    console.log("get all seller customers runs",req.seller.sellerId);

    const totalCustomers = await OrderModel.aggregate([
      { $match: { sellerId } },
      { $group: { _id: "$userId" } },  // Group by unique userId
      { $count: "totalCustomers" }
    ]);
    
    const total = totalCustomers.length ? totalCustomers[0].totalCustomers : 0;
    console.log("total", total);
    
    // Fetch unique orders for each customer
    const customers = await OrderModel.aggregate([
      { $match: { sellerId: req.seller.sellerId } },  // Filter orders by seller
      { $group: { _id: '$userId' } },  // Group orders by unique userId (customer)
      { $lookup: { from: 'usermodels', localField: '_id', foreignField: '_id', as: 'customerInfo' } },  // Join with User model
      { $unwind: '$customerInfo' },  // Flatten the customer data
      { $project: { 'customerInfo.fullName': 1, 'customerInfo.email': 1, 'customerInfo.avatar': 1 , 'customerInfo._id': 1} }  // Select the fields you need
    ]);
    console.log("orders",customers);
    
    if (!customers) {
        throw new apiError(404,"Customers not found");
    }
    res.status(200).json(new apiResponse(200,"Customers found successfully",customers,total))
})

export {getAllSellerCustomers}
