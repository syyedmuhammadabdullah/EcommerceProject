import {apiError,apiResponse,asyncHandler,NotificationModel} from "../../index.js"

const clearAllNotifications = asyncHandler(async(req,res)=>{
    
    console.log("mark runs all",req.params);
    
    const query={
        recipientModel:req.params.role,
        recipient:req.params.id,
        isCleared:false
    }
  await NotificationModel.updateMany(query, { isCleared: true, isRead: true });
    res.status(200).json(new apiResponse(200, "All notifications cleared successfully"));
  });
  
  export { clearAllNotifications };