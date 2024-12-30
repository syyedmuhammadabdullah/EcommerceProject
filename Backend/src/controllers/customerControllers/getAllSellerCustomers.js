import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js";
import mongoose from "mongoose";

const getAllSellerCustomers=asyncHandler(async(req,res)=>{
  const sellerId=req.seller.sellerId;
    console.log("get all seller customers runs",req.seller.sellerId);

    const totalCustomers = await OrderModel.aggregate([
      { $match: { 'products.sellerId': new mongoose.Types.ObjectId(sellerId) } },
      { $unwind: '$products' },
      { $match: { 'products.sellerId': new mongoose.Types.ObjectId(sellerId) } },
      { $group: { _id: '$userId' } },
      { $count: 'total' }
    ]);
    const total = totalCustomers[0]?.total || 0;
console.log("total",total);


    const orders=await  OrderModel.aggregate([
      // Step 1: Match orders that have products from the seller
      {
        $match: {
          'products.sellerId':new mongoose.Types.ObjectId(sellerId)
        }
      },
      // Step 2: Unwind the products array
      { $unwind: '$products' },
      // Step 3: Filter products by sellerId
      {
        $match: {
          'products.sellerId':new mongoose.Types.ObjectId(sellerId)
        }
      },
      // Step 4: Group by userId to get unique customers
      {
        $group: {
          _id: '$userId' // Group by userId
        }
      },
      // Step 5: Lookup user details (optional)
      {
        $lookup: {
          from: 'usermodels', // Your User collection name
          localField: '_id', // The grouped userId
          foreignField: '_id',
          as: 'customerDetails'
        }
      },
      // Step 6: Project the necessary fields (optional)
      {
        $project: {
          _id: 0, // Remove MongoDB's default _id
          customerDetails: { $arrayElemAt: ['$customerDetails', 0] } // Show only the first matching customer
        }
      },
        {
          $project: {
            'customerDetails._id': 1, // Include only the user's _id
            'customerDetails.fullName': 1, // Include only the user's name
            'customerDetails.avatar': 1,
          }
        }
      
    ]);
      
    if (!orders) {
        throw new apiError(404,"Customers not found");
    }
    res.status(200).json(new apiResponse(200,"Customers found successfully",orders,total))
})

export {getAllSellerCustomers}
