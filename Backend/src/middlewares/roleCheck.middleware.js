import { apiError, asyncHandler } from "../index.js";

const roleCheckMiddleware =(currentRole,secondRole)=> asyncHandler(async (req,_, next) => {
    const role = req.role;
    
    if (role!==currentRole || role!==secondRole) {
        throw new apiError(401, "UnAuthorized request");
    }
  

    next();
});

export { roleCheckMiddleware };