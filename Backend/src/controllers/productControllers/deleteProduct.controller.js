import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js"

const deleteProduct=asyncHandler(async(req,res)=>{
    console.log("delete product runs",req.body);
    const {productId}=req.body;
    
    if(!productId){
        throw new apiError(400,"Product id is required");
    }
   const product= await ProductModel.findByIdAndDelete(productId)
    res.status(200).json(new apiResponse(200,"Product deleted successfully",product))
})

export {deleteProduct}