import {apiResponse,apiError,asyncHandler,MainCategoryModel,SubMainCategoryModel} from "../../index.js";

const getAllCategories=asyncHandler(async(req,res)=>{

    const categories=await MainCategoryModel.aggregate([
  {
    $lookup: {
      from: "submaincategorymodels",
      let: { catId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$mainCategoryId", "$$catId"],
            },
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ],
      as: "subcategories",
    },
  },
]);
   
    console.log("categories log ",categories);
    
    if(categories.length==0) return res.status(404).json(new apiError(404,"No categories found"))
    res.status(200).json(new apiResponse(200,"Categories found successfully",categories))
})
export {getAllCategories}