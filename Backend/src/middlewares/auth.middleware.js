import { apiError, asyncHandler, UserModel, refreshAccessToken } from "../index.js";
import jwt from "jsonwebtoken";

const authMiddleware=asyncHandler(async(req,res,next)=>{
   console.log("auth middleware runs");
       const accessToken=req.cookies.accessToken
       
       
           if (!accessToken) {
            console.log("access token not found runs");
               throw new apiError(401,"UnAuthorized request")
           }
     const decodedToken=await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY,async function(error,decodedToken){
         if (error) {
            if (error.message==="jwt expired") {
             await refreshAccessToken(req,res)
              return false;
            }
            throw new apiError(400,error.message)
         }
         return decodedToken
     })
     
     if (!decodedToken) {
       return next()
     }
     console.log("decoded token",decodedToken);
     

     const user=await UserModel.findById(decodedToken.id)
 
     if (!user) {
         throw new apiError(400,"access token not valid")
     }
     console.log(decodedToken.sessionId,req.user?.sessions);
     
     const session= user.sessions.find(session=>session.sessionId===decodedToken.sessionId)
     console.log("session",session);
     (session)
     if (!session) {
         throw new apiError(400,"session not found")
        
     }
     session.lastActive=Date.now()
     await user.save()
 
     req.user=user
     req.role=decodedToken.role
     req.sessionId=decodedToken.sessionId
     next()
})

export {authMiddleware}
