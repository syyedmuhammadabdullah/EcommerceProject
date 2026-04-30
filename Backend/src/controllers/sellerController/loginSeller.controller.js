import {apiError,apiResponse,asyncHandler,SellerModel,generateTokens,UserModel,options, NotificationModel, io} from "../../index.js";
import {validate} from "email-validator";

const loginSeller = asyncHandler(async (req, res) => {
    const { email, password,device } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!(email || password || device)) {
        throw new apiError(400, "All fields are required");
    }

    if(!validate(email)){
        throw new apiError(400, "Invalid email format");
    }

    let seller = await UserModel.findOne({ email });
    if (!seller) {
        throw new apiError(401, "Invalid credentials"); 
    }else if (!seller.role.includes("seller")) {
        throw new apiError(401, "role not matched");
    }

    const isMatch = await seller.passwordCheck(password);
    if (!isMatch) {
        throw new apiError(400, "Invalid credentials");
    }

    const sessionId = Date.now().toString();
    const { accessToken, refreshToken } = await generateTokens({userId:seller._id,role:"seller",sessionId:sessionId});
    const newSession={
        sessionId:sessionId,
        device: device || "unknown",
        ip:ip,}
    
    seller.sellerSessions.push(newSession);
    seller.save();
    const notification=await NotificationModel.create({
        recipientModel:"Seller",
        recipient:seller._id,
        type:"login",
        title:"New Login Detected",
        message:`A new login to your account was detected from device: ${device || "unknown"}, IP: ${ip} at ${new Date().toLocaleString()}. If this was you, you can safely ignore this message. If not, please secure your account immediately.`,
        redirect:true,
        data:{sessionId:sessionId}
    })
    io.to(seller._id.toString()).emit("notification", notification);
    const loggedInSeller = await UserModel.findById(seller._id).select("-password -refreshToken").populate("sellerId");
    req.seller = loggedInSeller;
    res.status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
    .json(new apiResponse(200, "seller logged in successfully", loggedInSeller));    
});

export { loginSeller };