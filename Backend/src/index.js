//Utlis imports
import { asyncHandler } from "./utlis/asyncHandler.js";
import { apiError } from "./utlis/apiError.js";
import { apiResponse } from "./utlis/apiResponse.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "./utlis/cloudinary.js";
import { generateTokens, options, refreshAccessToken } from "./utlis/generateTokens.js";
import { transformAttributes } from "./utlis/transformAttributes.js";
import { rangeFormat } from "./utlis/rangeFormat.js";
import { generateLabels } from "./utlis/generateLabels.js";
import { orginizeChart } from "./utlis/orginizeCharts.js";

//Constants
import { dbName } from "./constant.js";

//Middlewares
import { uploadMiddleware } from "./middlewares/multer.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { roleCheckMiddleware } from "./middlewares/roleCheck.middleware.js";

//Models
import { UserModel } from "./models/user.model.js";
import { ProductModel } from "./models/product.model.js";
import { CartModel, CartItemModel } from "./models/userCart.model.js";
import { AddressModel } from "./models/Address.model.js";
import { WishlistModel } from "./models/userWishlist.model.js";
import { OrderModel } from "./models/order.model.js";
import { ProductReviewModel } from "./models/productReview.model.js";
import { ProductQuestionModel } from "./models/productQuestion.model.js";
import { MainCategoryModel } from "./models/mainCategory.model.js"
import { SubMainCategoryModel } from "./models/subMainCategory.model.js"
import { SellerModel } from "./models/seller.model.js";
import { SellerWalletModel } from "./models/sellerWallet.model.js";
import { SellerTransactionModel } from "./models/sellerTransaction.model.js";
import { SellerWithdrawalModel } from "./models/sellerWidthdraw.model.js";
//Controllers

//UserControllers
import { createUser } from "./controllers/userControllers/createUser.controller.js";
import { loginUser } from "./controllers/userControllers/loginUser.controller.js";
import { logoutUser } from "./controllers/userControllers/logoutUser.controller.js";
import { updateUserPassword } from "./controllers/userControllers/updateUserPassword.controller.js";
import {
    resetUserPassword,
    verifyPasswordResetToken,
    reqPasswordResert,
} from "./controllers/userControllers/resetUserPassword.js";
import { updateUserAvatar } from "./controllers/userControllers/updateUserAvatar.controller.js";
import { updateUserGenderAndDOB } from "./controllers/userControllers/updateUserGenderAndDOB.js";
import { updateUserUsername } from "./controllers/userControllers/updateUserUsername.controller.js";
import { updateUserFullName } from "./controllers/userControllers/updateUserFullName.controller.js";
import { updateUserEmail } from "./controllers/userControllers/updateUserEmail.controller.js";
import { updateUserRecoveryEmail } from "./controllers/userControllers/updateUserRecoveryEmail.controller.js";
import { getAllUsers } from "./controllers/userControllers/getAllUsers.controller.js";
import { getUser } from "./controllers/userControllers/getUser.controller.js";
import { updateUserBasicInfo } from "./controllers/userControllers/upadeUserBasicInfo.controller.js";

//ProductControllers
import { createBasicProduct } from "./controllers/productControllers/createBasicProduct.controller.js";
import { getAllProducts } from "./controllers/productControllers/getAllProducts.controller.js";
import { getOneProduct } from "./controllers/productControllers/getOneProduct.controller.js";
import { productFilter } from "./controllers/productControllers/productFIlter.controller.js";
import { createProduct } from "./controllers/productControllers/createProduct.controller.js";
import { getAllSellerProducts } from "./controllers/productControllers/getAllSellerProducts.controller.js";
import { updateProductDetails } from "./controllers/productControllers/updateProductDetails.controller.js";
import { deleteProduct } from "./controllers/productControllers/deleteProduct.controller.js";
import { getOneSellerProduct } from "./controllers/productControllers/getOneSellerProduct.controller.js";
import {updateProductStatus} from "./controllers/productControllers/updateProductStatus.controller.js"
//AddressControllers
import { createAddress } from "./controllers/addressControllers/createAddress.controller.js";
import { deleteAddress } from "./controllers/addressControllers/deleteAddress.controller.js";
import { editAddress } from "./controllers/addressControllers/editAddress.controller.js";
import { getSingleAddress } from "./controllers/addressControllers/getSingleAddress.controller.js";
import { getAllAddress } from "./controllers/addressControllers/getallAdress.controller.js";
import { changeDefaultAddress } from "./controllers/addressControllers/changeDefaultAddress.controller.js";

// Cart Controllers
import { addItemToCart } from "./controllers/cartControllers/addItemToCart.controller.js";
import { getUserCart } from "./controllers/cartControllers/getUserCart.controller.js";
import { removeItemFromCart } from "./controllers/cartControllers/removeItemFromCart.controller.js";
import { updateCartItem } from "./controllers/cartControllers/updateCartItem.controller.js";

//Wishlist Controllers
import { addItemToWishlist } from "./controllers/wishlistControllers/addItemToWishlist.controller.js";
import { removeItemFromWishlist } from "./controllers/wishlistControllers/removeItemFromWishlist.controller.js";
import { getWishlist } from "./controllers/wishlistControllers/getWishlist.controller.js";

//Order Controllers
import { createOrder } from "./controllers/orderControllers/createOrder.controller.js";
import { getOrders } from "./controllers/orderControllers/getOrders.controller.js";
import { updateOrderController } from "./controllers/orderControllers/updateOrder.controller.js";
import { trackOrder } from "./controllers/orderControllers/trackOrder.controller.js";
import { deliveredOrder } from "./controllers/orderControllers/deliveredOrder.controller.js";
import { getSellerOrders } from "./controllers/orderControllers/getSellerOrders.js";
import { getOneSellerOrder } from "./controllers/orderControllers/getOneSellerOrder.controller.js";
import { getSellerOrdersDetail } from "./controllers/orderControllers/getSellerOrdersDetail.js";
import {getAllOrders} from "./controllers/orderControllers/getAllOrders.controller.js"
import { getCustomerOrders } from "./controllers/orderControllers/getCustomerOrders.controller.js";
//Payment Controllers
//Stripe
import { createStripePayment } from "./controllers/paymentControllers/createStripePayment.controller.js";

//Product Review Controllers
import { createProductReview } from "./controllers/productReviewControllers/createProductReview.controller.js";
import { getProductReview } from "./controllers/productReviewControllers/getProductReview.controller.js";
import { getUserProductReview } from "./controllers/productReviewControllers/getUserProductReview.controller.js";
import { updateProductReview } from "./controllers/productReviewControllers/updateProductReview.controller.js";

//Product Question Controllers
import { createProductQuestion } from "./controllers/productQuestionControllers/createProductQuestion.controller.js";
import { getProductQuestion } from "./controllers/productQuestionControllers/getProductQuestion.controller.js";
import { deleteProductQuestion } from "./controllers/productQuestionControllers/deleteProductQuestion.controller.js";
import { updateProductQuestion } from "./controllers/productQuestionControllers/updateProductQuestion.controller.js";
import { updateAnswerToProductQuestion } from "./controllers/productQuestionControllers/updateAnswerToProductQuestion.controller.js";
import { getAllProductsForAdmin } from "./controllers/productControllers/getAllProductsForAdmin.controller.js";
//Main Category Controllers
import { createMainCategory } from "./controllers/categoryControllers/mainCategory/createMainCategory.controller.js";
import { getMainCategory } from "./controllers/categoryControllers/mainCategory/getMainCategory.controller.js";
import { deleteMainCategory } from "./controllers/categoryControllers/mainCategory/deleteMainCategory.controller.js";
import { updateMainCategory } from "./controllers/categoryControllers/mainCategory/updateMainCategory.controller.js";

//Sub Category Controllers
import { createSubMainCategory } from "./controllers/categoryControllers/subMainCategory/createSubMainCategory.controller.js";
import { getSubMainCategory } from "./controllers/categoryControllers/subMainCategory/getSubMainCategory.controller.js";
import { deleteSubMainCategory } from "./controllers/categoryControllers/subMainCategory/deleteSubMainCategory.controller.js";
import { updateSubMainCategory } from "./controllers/categoryControllers/subMainCategory/updateSubMainCategory.controller.js";
//Sub Sub Category Controllers
//Comming Soon

//Seller Controllers
import { createSeller } from "./controllers/sellerController/createSeller.controller.js";
import { loginSeller } from "./controllers/sellerController/loginSeller.controller.js";
import { updateSellerDetails } from "./controllers/sellerController/updateSellerDetails.controller.js";
import { getSellerProductsQuestion } from "./controllers/sellerController/getSellerProductsQuestion.js";
import { getSeller } from "./controllers/sellerController/getSeller.controller.js";
import {getAllSellers} from "./controllers/sellerController/getAllSellers.controller.js"
import {getSellerDetails} from "./controllers/sellerController/getSellerDetails.controller.js"
import {updateSellerStatus} from "./controllers/sellerController/updateSellerStatus.controller.js"
import { getSellerAllOrders } from "./controllers/orderControllers/getSellelrAllOrders.controller.js";
import { getSellerDetailForAdmin } from "./controllers/sellerController/getSellerDetailForAdmin.controller.js";
//Admin Controllers
import { loginAdmin } from "./controllers/adminContollers/loginAdmin.controller.js";
import { getAdmin } from "./controllers/adminContollers/getAdmin.controller.js";
import { createAdmin } from "./controllers/adminContollers/createAdmin.controller.js";

//Customer Controllers
import { getAllSellerCustomers } from "./controllers/customerControllers/getAllSellerCustomers.js";
import { getAllCustomers } from "./controllers/customerControllers/getAllCustomers.js";

//Transcation Controllers
import { getSellerTransaction } from "./controllers/sellerTransactionControllers/getSellerTransection.controller.js";
import { getSellerBalance } from "./controllers/sellerTransactionControllers/getSellerBalance.controller.js";
import { requestWithdraw } from "./controllers/sellerTransactionControllers/requestWithdraw.controller.js";
import {updateWithdrawRequest} from "./controllers/sellerTransactionControllers/updateWithdrawRequest.controller.js"
import {getSellerWithdrawHistory} from "./controllers/sellerTransactionControllers/getSellerWithdrawHistory.controller.js"
import {getPendingWithdrawalRequest} from "./controllers/sellerTransactionControllers/getPendingWithdrawalRequest.controller.js"
//Services
import { geoNamesCountries, geoNamesStates, geoNamesCities, geoNamesTowns } from "./services/geoNamesService.js";

//Routes
import { userRouter } from "./routes/user.routes.js";
import { sellerRouter } from "./routes/seller.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { addressRouter } from "./routes/address.routes.js";
import { serviceRouter } from "./routes/service.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { wishlistRouter } from "./routes/wishlist.routes.js";
import { orderRouter } from "./routes/order.routes.js";
import { paymentRouter } from "./routes/payment.routes.js";
import { productReviewRouter } from "./routes/productReview.routes.js";
import { productQuestionRouter } from "./routes/productQuestion.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { customerRouter } from "./routes/customer.route.js";
import { couponRouter } from "./routes/coupon.routes.js";
import { transactionRouter } from "./routes/transaction.routes.js";
import { adminRouter } from "./routes/admin.routes.js";

//Others
import { connectDB } from "./db/connectDB.js";
import { app } from "./app.js";


// Exports


// Utils Exports
export { asyncHandler, apiError, apiResponse, uploadOnCloudinary, deleteOnCloudinary, generateTokens, refreshAccessToken, options, transformAttributes,orginizeChart,generateLabels, rangeFormat }; // End of Utils Exports

// Constants Export
export { dbName }; // End of Constants Export

// Middleware Exports
export { uploadMiddleware, authMiddleware, roleCheckMiddleware }; // End of Middleware Exports

// Model Exports
export {
    UserModel,
    ProductModel,
    ProductReviewModel,
    ProductQuestionModel,
    CartModel,
    CartItemModel,
    AddressModel,
    WishlistModel,
    OrderModel,
    MainCategoryModel,
    SubMainCategoryModel,
    SellerModel,
    SellerWalletModel,
    SellerTransactionModel,
    SellerWithdrawalModel,
}; // End of Model Exports

//Controller Exports

// User Controller Exports
export {
    createUser,
    loginUser,
    logoutUser,
    updateUserPassword,
    resetUserPassword,
    verifyPasswordResetToken,
    reqPasswordResert,
    updateUserAvatar,
    updateUserGenderAndDOB,
    updateUserUsername,
    updateUserFullName,
    updateUserEmail,
    updateUserRecoveryEmail,
    getAllUsers,
    getUser,
    updateUserBasicInfo,
}; // End of User Controller Exports

// Seller Controller Exports
export { createSeller,getSellerDetailForAdmin ,getAllSellers, getSellerDetails, updateSellerStatus, loginSeller, updateSellerDetails, getSellerProductsQuestion, getSeller }; // End of Seller Controller Exports

//Admin Controller Exports
export { loginAdmin, getAdmin, createAdmin };

//Customer Controller Exports
export { getAllSellerCustomers,getCustomerOrders, getAllCustomers };

// Product Controller Exports
export { createBasicProduct,getAllProductsForAdmin, getOneSellerProduct, getAllProducts, getOneProduct, productFilter, createProduct, getAllSellerProducts, updateProductDetails,updateProductStatus, deleteProduct }; // End of Product Controller Exports

// Address Controller Exports
export { createAddress, editAddress, deleteAddress, getAllAddress, getSingleAddress, changeDefaultAddress }; // End of Address Controller Exports

// Cart Controller Exports
export { addItemToCart, getUserCart, removeItemFromCart, updateCartItem }; // End of Cart Controller Exports

//Wishlist Controller Exports
export { addItemToWishlist, removeItemFromWishlist, getWishlist }; // End of Wishlist Controller Exports

//Order Controller Exports
export { createOrder,
         getOrders,
         trackOrder,
         deliveredOrder,
         getSellerOrders,
         getOneSellerOrder,
         getSellerOrdersDetail,
            updateOrderController,
            getAllOrders,
            getSellerAllOrders,
            

             }; // End of Order Controller Exports

//Category Controller Exports
export { createMainCategory, 
         getMainCategory, 
         deleteMainCategory, 
         updateMainCategory, 
         createSubMainCategory,
         getSubMainCategory,
         deleteSubMainCategory,
         updateSubMainCategory 
        };

//Payment Controller Exports

//Stripe
export { createStripePayment };

//Product Review Controller Exports
export { createProductReview, getProductReview, getUserProductReview, updateProductReview }; // End of Product Review Controller Exports

//Product Question Controller Exports
export {
    createProductQuestion,
    getProductQuestion,
    deleteProductQuestion,
    updateProductQuestion,
    updateAnswerToProductQuestion,
}; // End of Product Question Controller Exports

//Seller Transaction Controller Exports
export { getSellerWithdrawHistory, getPendingWithdrawalRequest,getSellerTransaction, updateWithdrawRequest, getSellerBalance, requestWithdraw };

//End of Controller Exports

// Route Exports
export {
    paymentRouter,
    productReviewRouter,
    productQuestionRouter,
    userRouter,
    sellerRouter,
    productRouter,
    serviceRouter,
    addressRouter,
    orderRouter,
    cartRouter,
    wishlistRouter,
    categoryRouter,
    customerRouter,
    couponRouter,
    adminRouter,
    transactionRouter
}; // End of Route Exports

// Service Exports
export { geoNamesCountries, geoNamesStates, geoNamesCities, geoNamesTowns }; // End of Service Exports

// Other Exports
export { connectDB, app,  }; // End of Other Exports

//End of Exports
