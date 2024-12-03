import { apiError, asyncHandler } from "../index.js";

const roleCheckMiddleware =(currentRole)=> asyncHandler(async (req,_, next) => {
    const role = req.role;
    console.log(role,currentRole);
    
    if (role!==currentRole) {
        throw new apiError(401, "UnAuthorized request");
    }
  

    next();
});

export { roleCheckMiddleware };