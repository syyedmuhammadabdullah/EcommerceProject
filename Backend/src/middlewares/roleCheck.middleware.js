import { apiError, asyncHandler } from "../index.js";

const roleCheckMiddleware =(...roles)=> asyncHandler(async (req,_, next) => {
    const role = req.role;
    
    if (!roles.includes(role)) {        
        throw new apiError(401, "UnAuthorized request");
    }
  

    next();
});

export { roleCheckMiddleware };