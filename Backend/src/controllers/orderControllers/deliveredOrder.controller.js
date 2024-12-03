import {apiResponse,asyncHandler,OrderModel} from "../../index.js";

const deliveredOrder=asyncHandler(async(req,res)=>{

  const orders=await OrderModel.aggregate([
        {
            $match:{userId:req?.user._id,
                "products.tracking.status":"delivered"
            }
        },
        {
            $project: {
                _id: 0,
                products: {
                    $filter: {
                        input: "$products",
                        as: "product",
                        cond: { $eq: ["$$product.tracking.status", "delivered"] }
                    }
                }
            }
        },
        {
            $unwind: "$products"
        }
    ])

    res.status(200)
    .json(new apiResponse(200,"Orders found successfully",orders))

})

export {deliveredOrder}