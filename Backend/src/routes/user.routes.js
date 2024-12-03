import { Router } from "express";
import {
    //User Imports
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
    //Middlewares
    authMiddleware,
    uploadMiddleware,
    apiResponse,
    updateUserBasicInfo,
    apiError,
} from "../index.js";
//User routes
const userRouter = Router();

userRouter.route("/register").post(createUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/reqpasswordreset").post(reqPasswordResert);

userRouter.route("/verifyPasswordResetToken").post(verifyPasswordResetToken);

userRouter.route("/resetPassword").post(resetUserPassword);

userRouter.route("/getAllUsers").get(getAllUsers);

//user Protected Routes
userRouter.route("/logout").post(authMiddleware, logoutUser);

userRouter.route("/updateAvatar").post(authMiddleware, uploadMiddleware.single("avatar"), updateUserAvatar);

userRouter.route("/updateFullName").post(authMiddleware, updateUserFullName);

userRouter.route("/updateEmail").post(authMiddleware, updateUserEmail);

userRouter.route("/updateRecoveryEmail").post(authMiddleware, updateUserRecoveryEmail);

userRouter.route("/updatePassword").post(authMiddleware, updateUserPassword);

userRouter.route("/updateUsername").post(authMiddleware, updateUserUsername);

userRouter.route("/updateGenderAndDOB").post(authMiddleware, updateUserGenderAndDOB);

userRouter.route("/updateBasicInfo").post(authMiddleware,updateUserBasicInfo)

userRouter.route("/getUser").get(authMiddleware, getUser);

userRouter.route("/check").get(authMiddleware,(req, res) => {
    res.status(200).send(new apiResponse(200,"user is logged in",req.user));
})
userRouter.route("/test").get((error,req,res)=>{
    
    // res.status(401).json())
})

export { userRouter };
