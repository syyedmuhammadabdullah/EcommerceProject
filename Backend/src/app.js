import express, { Router } from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
const app=express();
// app.use(cors());
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"," http://192.168.10.3:5173"," http://192.168.10.3:5174"],
    credentials:true,	
}));
app.use(express.json());
dotenv.config({path:"./.env"});
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 401; // Default to 500 if statusCode is undefined
    const message = err.message || "testing";
    const errors = err.errors || [];
  
    // Send a JSON response
    res.status(statusCode).json({
      success: false,
      statusCode,
      message, // Custom error message
      errors,  // Additional error details (if provided)
    });
  };
  
  

  

//User Routes
import  {userRouter} from "./index.js"
app.use("/api/v1/users",userRouter)

//Seller Routes
import  {sellerRouter} from "./index.js"
app.use("/api/v1/sellers",sellerRouter)

//Product Routes
import  {productRouter} from "./index.js"
app.use("/api/v1/products",productRouter)

//Service Routes
import  {serviceRouter} from "./index.js"
app.use("/api/v1/services",serviceRouter)

//Address Routes
import { addressRouter } from "./index.js";
app.use("/api/v1/address",addressRouter)

//Cart Routes
import { cartRouter } from "./index.js";
app.use("/api/v1/cart",cartRouter)

//Wishlist Routes
import { wishlistRouter } from "./index.js";
app.use("/api/v1/wishlist",wishlistRouter)

//Order Routes
import { orderRouter } from "./index.js";
app.use("/api/v1/orders",orderRouter)

//Payment Routes
import { paymentRouter } from "./index.js";
app.use("/api/v1/payment",paymentRouter)

//Product Review Routes
import { productReviewRouter } from "./index.js";
app.use("/api/v1/productReviews",productReviewRouter)

//Product Question Routes
import { productQuestionRouter } from "./index.js";
app.use("/api/v1/productQuestions",productQuestionRouter)

//Category Routes
import { mainCategoryRouter, subMainCategoryRouter } from "./index.js";
app.use("/api/v1/mainCategory",mainCategoryRouter)
app.use("/api/v1/subMainCategory",subMainCategoryRouter)

//Customer Routes
import { customerRouter } from "./index.js";
app.use("/api/v1/customers",customerRouter)

//Transaction Routes
import { transactionRouter } from "./index.js";
app.use("/api/v1/transactions",transactionRouter)

app.use(errorHandler);

export {app}