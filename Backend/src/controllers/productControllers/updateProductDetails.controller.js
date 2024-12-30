import { apiError, apiResponse, asyncHandler, ProductModel,transformAttributes } from "../../index.js";

const deliveryCharges=(req,res)=>{

    const { length, width, height, weight } = req.body;
    if (!length|| !weight || !height || !width) {
        return 150;
    }
    // Example: Base charge plus additional cost based on volume and weight
    const volume = length * width * height;
  let baseCharge = 150; // Base delivery charge
  let volumeCharge = volume > 5000 ? 10 : 5; // Charge based on volume
  let weightCharge = weight > 2 ? 10 : 5; // Charge based on weight

  return baseCharge + volumeCharge + weightCharge;
}

const updateProductDetails = asyncHandler(async (req, res) => {
    
    const productId=req.body._id;
    const attributes=transformAttributes(req.body)
    console.log("update product runs",attributes);
const productDetails={...req.body,totalStock: req.body.currentStock,attributes}

if (!productId) {
    throw new apiError(400, "Product ID is required");
}
const product=await ProductModel.findByIdAndUpdate(productId,productDetails,{new:true});

if (!product) {
    throw new apiError(404, "Product not found");
}

res.status(200)
.json(new apiResponse(200,"The product has been updated successfully",product ))

});


export { updateProductDetails };