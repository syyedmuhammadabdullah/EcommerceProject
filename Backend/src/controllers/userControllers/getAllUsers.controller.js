import {apiError,apiResponse,asyncHandler,UserModel} from "../../index.js";

const getAllUsers = asyncHandler(async (req, res) => {

    const {limit,pages}=req.body

    const users = await UserModel.aggregate([
        {
            $facet:{
                data:[
                    {
                        $project:{
                       password:0,
                       refreshToken:0,
                       __v:0,
                       public_id:0
                    }
                    },
                    {
                        $skip:1
                    },
                    {
                        $limit:1
                    }
                   
                ],
                totalCount:[{
                        $count:"Total Users"
                    },
                ]
                
                
            }
        }
    ])
    res.status(200)
    .json(new apiResponse(200,"Users found successfully",users))

});


export { getAllUsers }