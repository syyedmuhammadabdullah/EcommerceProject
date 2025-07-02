import { apiError, asyncHandler, UserModel, refreshAccessToken } from "../index.js";
import jwt from "jsonwebtoken";

const authMiddleware=asyncHandler(async(req,res,next)=>{
   console.log("auth middleware runs",req.cookies.accessToken);
       const accessToken=req.cookies.accessToken
       
       
           if (!accessToken) {
            await refreshAccessToken(req,res)
            return next()
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
     

     const user=await UserModel.findById(decodedToken.id)
 
     if (!user) {
         throw new apiError(400,"access token not valid")
     }
     
     const session= user.sessions.find(session=>session.sessionId===decodedToken.sessionId)
     const sellerSession= user.sellerSessions.find(session=>session.sessionId===decodedToken.sessionId)
     const adminSession= user.adminSessions.find(session=>session.sessionId===decodedToken.sessionId)
     
     if (!session && !sellerSession && !adminSession) {
         throw new apiError(400,"session not found")
        
     }
   
     if (session) {
         session.lastActive=Date.now()
         console.log("user found",user);
         
         req.user=user
     }else if (sellerSession) {
         sellerSession.lastActive=Date.now()
         console.log("seller found",user);
         req.seller=user      
     }else if (adminSession) {
         adminSession.lastActive=Date.now() 
         req.admin=user     
     }
     await user.save()
 

     req.role=decodedToken.role
     req.sessionId=decodedToken.sessionId
     next()
})

export {authMiddleware}
