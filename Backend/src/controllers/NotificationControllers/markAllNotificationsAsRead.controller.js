import {apiError,apiResponse,asyncHandler,NotificationModel} from "../../index.js"

const markAllNotificationsAsRead = asyncHandler(async(req,res)=>{
  console.log("mark all runs");
  
    const query={
        recipientModel:req.params.role,
        recipient:req.params.id,
        isRead:false
    }
  await NotificationModel.updateMany(query, { isRead: true });
    res.status(200).json(new apiResponse(200, "All notifications marked as read successfully"));
  });
  
  export { markAllNotificationsAsRead };