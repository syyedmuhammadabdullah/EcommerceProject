import { apiError, apiResponse, asyncHandler } from "../../index.js";

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
    const { name,price,discountPrice,brand,description,tags,category,subCategory,quantity,dimensionsL ,dimensionsB,dimensionsH,weight,stockStatus } = req.body;
    const { productId } = req.params;
    const { image, additionalImages } = req.files;

    let product = await ProductModel.findByIdAndUpdate(productId, {
        name,
        price,
        unitPrice: discountPrice>0?discountPrice:price,
        brand,
        description,
        tags,
        category,
        subCategory,
        quantity,
        dimensions: {
            	length: dimensionsL,
                width: dimensionsB,
                height: dimensionsH
        },
        weight,
        stockStatus,
        deliveryCharges:deliveryCharges(),
},{new:true});
    product.discountPrice=discountPrice;
await product.save()

res.status(200)
.json(new apiResponse(200,"The product has been updated successfully",product ))

});


