import notificationRoutes from "../utlis/notificationRoutes";

const useNotificationClick = (notification, navigate) => {
  if(!notification?.redirect )return;
  const routeFn = notificationRoutes[notification.type];

  if (routeFn) {
    const path = routeFn(notification.data);
    navigate(path);
} else {
//   navigate("/notifications"); // fallback
}
};

export default useNotificationClick;