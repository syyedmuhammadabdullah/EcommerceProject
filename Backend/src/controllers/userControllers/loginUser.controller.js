import { apiError , apiResponse,asyncHandler,UserModel,generateTokens,options, NotificationModel, io} from "../../index.js";
import { validate } from "email-validator";
const loginUser = asyncHandler(async (req, res) => {
    const { email, password,device } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
   
    if (!(email || password || device || ip)) {
        throw new apiError(400, "All fields are required");
    }

    if(!validate(email)){
        throw new apiError(400, "Invalid email format");
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
        throw new apiError(401, "Invalid credentials");
    }
    if (!user.role.includes("user")) {
        throw new apiError(401, "role not matched");
        
    }

    const isMatch = await user.passwordCheck(password);
    if (!isMatch) {
        throw new apiError(400, "Invalid credentials");
    }
    const sessionId = Date.now().toString();
    const { accessToken, refreshToken } = await generateTokens({userId:user._id,role:"user",sessionId:sessionId});
    const newSession={
        sessionId:sessionId,
        device: device,
        ip:ip,}

    user.sessions.push(newSession)
    await user.save();

    req.user=user
        const notification=await NotificationModel.create({
        recipientModel: "User",
        recipient: user._id,
        message: "New login detected from device: "+device,
        type: "login",
        title: "Login Notification",
        redirect: true,
        data: { userId: user._id },
    })
    io.to(user._id.toString()).emit("notification",notification)
    res.status(200)
    .cookie("accessToken", accessToken, { options, maxAge: 24 * 60 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, { options, maxAge: 10 * 24 * 60 * 60 * 1000 })
    .json(new apiResponse(200, "Login success", user));

})


export { loginUser }