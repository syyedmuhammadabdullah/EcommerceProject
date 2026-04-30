import { Router } from "express";
import {
    authMiddleware, roleCheckMiddleware,
     getNotifications, getNotificationCount, markAllNotificationsAsRead, markNotificationAsRead, clearAllNotifications
} from "../index.js";

const notificationRouter = Router();

notificationRouter.get("/getNotifications/:id/:role", authMiddleware, roleCheckMiddleware("user", "admin", "seller"), getNotifications)
notificationRouter.get("/getNotificationCount/:id/:role", authMiddleware, roleCheckMiddleware("user", "admin", "seller"), getNotificationCount)
notificationRouter.post("/markAsRead/:notificationId/:role", authMiddleware, roleCheckMiddleware("user", "admin", "seller"), markNotificationAsRead)
notificationRouter.post("/markAllAsRead/:id/:role", authMiddleware, roleCheckMiddleware("user", "admin", "seller"), markAllNotificationsAsRead)
notificationRouter.post("/clearAll/:id/:role", authMiddleware, roleCheckMiddleware("user", "admin", "seller"), clearAllNotifications)
export { notificationRouter };