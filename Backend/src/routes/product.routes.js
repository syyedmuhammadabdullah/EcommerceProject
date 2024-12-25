import { Router } from "express";
import { getAllProducts, getOneProduct,getAllSellerProducts, productFilter, asyncHandler, apiError,createProduct,uploadMiddleware, authMiddleware,updateProductDetails, deleteProduct } from "../index.js";
const productRouter = Router();

productRouter.get(
    "/test",
   
    asyncHandler(async (req, res, next) => {
      const someCondition = false; // Simulate a condition
      if (!someCondition) {
        throw new apiError(500, "Custom error message: Something went wrong!");
      }
  
      res.json({ success: true, message: "Request successful!" });
    })
  );

productRouter.get("/getProducts", getAllProducts)
productRouter.get("/getOneProduct", getOneProduct)
productRouter.post("/createProduct",authMiddleware,uploadMiddleware.any(), createProduct)
productRouter.get("/productFilter", productFilter)
productRouter.get("/getAllSellerProducts",authMiddleware,getAllSellerProducts)
productRouter.post("/updateProductDetails",authMiddleware,uploadMiddleware.any(),updateProductDetails)
productRouter.post("/deleteProduct",deleteProduct)
// productRouter.route("/test").get(authMiddleware, (req, res) => {
//     res.status(200).send(new apiResponse(200,"user is logged in",req.seller));
// })

export { productRouter }