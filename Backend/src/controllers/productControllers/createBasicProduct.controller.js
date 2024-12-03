import { apiError, apiResponse, asyncHandler, ProductModel,uploadOnCloudinary } from "../../index.js";

const createBasicProduct = asyncHandler(async (req, res) => {

    const { name, description, price, quantity, category,subCategory } = req.body;

    const image=req.file

    if (!name || !description || !price || !quantity || !category  || !subCategory) {

        throw new apiError(400, "All fields are required");
    }

//    let uploadedImage=await uploadOnCloudinary(image.path)

    const product = await ProductModel.create({
        seller:"67276e45f3fac939bf91c98c",
        name,
        description,
        price,
        unitPrice: price,
        quantity,
        category,
        subCategory,
        image:"rter",
        brand:"rter",
        // image:uploadedImage.secure_url,
        // imagePublic_id:uploadedImage.public_id
    });

    res.status(200)
    .json(new apiResponse(200, "Product created successfully", product));
});
export { createBasicProduct }