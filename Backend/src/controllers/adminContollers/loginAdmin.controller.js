import {apiError,apiResponse,asyncHandler,SellerModel,generateTokens,UserModel,options} from "../../index.js";
import {validate} from "email-validator";

const loginAdmin = asyncHandler(async (req, res) => {
    
    const { email, password,device } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!(email || password || device)) {
        throw new apiError(400, "All fields are required");
    }

    if(!validate(email)){
        throw new apiError(400, "Invalid email format");
    }

    let admin = await UserModel.findOne({ email });
        console.log("admin login runs",admin);

    if (!admin) {
        throw new apiError(401, "Invalid credentials"); 
    }else if (!admin.role.includes("admin")) {
        throw new apiError(401, "role not matched");
    }

    const isMatch = await admin.passwordCheck(password);
    if (!isMatch) {
        throw new apiError(400, "Invalid credentials");
    }

    const sessionId = Date.now().toString();
    const { accessToken, refreshToken } = await generateTokens({userId:admin._id,role:"admin",sessionId:sessionId});
    const newSession={
        sessionId:sessionId,
        device: device || "unknown",
        ip:ip,}
    
    admin.adminSessions.push(newSession);
    admin.save();
    req.admin = admin;
    res.status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
    .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
    .json(new apiResponse(200, "admin logged in successfully", admin));    
});

export { loginAdmin };