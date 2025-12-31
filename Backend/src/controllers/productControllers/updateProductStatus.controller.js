import {apiResponse,apiError,asyncHandler,ProductModel} from "../../index.js";

const updateProductStatus=asyncHandler(async(req,res)=>{
    const {productId,status}=req.body;
    if(!productId || !status){
        throw new apiError(400,"All fields are required");
    }
    const product=await ProductModel.findById(productId);
    if(!product){
        throw new apiError(400,"Product not found");
    }
    if(product.status===status){
        throw new apiError(400,"Product status already updated");
    }
    if (status==="suspended" && !req.admin) {
        throw new apiError(400, "Only admin can suspend a product");
    }
    product.status=status;
    await product.save();
    res.status(200).json(new apiResponse(200,"Product status updated successfully",product));
})
export {updateProductStatus}