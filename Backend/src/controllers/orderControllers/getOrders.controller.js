import {apiError,apiResponse,asyncHandler,OrderModel} from "../../index.js"

const getOrders=asyncHandler(async(req,res)=>{

    // const orders=await OrderModel.find({userId:req.user._id});
    const orders=await OrderModel.aggregate([
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

    res.status(200)
    .json(new apiResponse(200,"Orders found successfully",orders))

})

export {getOrders}