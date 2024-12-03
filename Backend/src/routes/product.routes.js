import { Router } from "express";
import { getAllProducts, getOneProduct,createBasicProduct, productFilter, asyncHandler, apiError } from "../index.js";
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
productRouter.post("/createProduct", createBasicProduct)
productRouter.get("/productFilter", productFilter)

export { productRouter }