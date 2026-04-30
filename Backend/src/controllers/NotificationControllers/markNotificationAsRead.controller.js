import {apiError,apiResponse,asyncHandler,NotificationModel} from "../../index.js"
const markNotificationAsRead = asyncHandler(async(req,res)=>{
    const notificationId = req.params.notificationId;
    const notification = await NotificationModel.findById(notificationId);
    if(!notification){
        throw new apiError(404,"Notification not found");
    }
    notification.isRead = true;
    await notification.save();
    return res.status(200).json(new apiResponse(200,"Notification marked as read", notification));
});
export {markNotificationAsRead}