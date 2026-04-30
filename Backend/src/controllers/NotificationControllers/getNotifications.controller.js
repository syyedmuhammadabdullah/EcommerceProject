import {apiError,apiResponse,asyncHandler,NotificationModel} from "../../index.js"

const getNotifications = asyncHandler(async(req,res)=>{
    
    const query={
        recipientModel:req.params.role,
        recipient:req.params.id,
        isCleared:false
    }

    const notifications = await NotificationModel.find(query).sort({createdAt: -1}).skip((req.query.page - 1) * req.query.limit).limit(req.query.limit);
   
    
    res.status(200).json(new apiResponse(200, "Notifications fetched successfully", notifications));
  });
  
  const getNotificationCount = asyncHandler(async(req,res)=>{
     const query={
        recipientModel:req.params.role,
        recipient:req.params.id,
        isRead:false
    }
    const count = await NotificationModel.countDocuments(query);
    res.status(200).json(new apiResponse(200, "Notification count fetched successfully", {count}));
  });
  export { getNotifications, getNotificationCount };