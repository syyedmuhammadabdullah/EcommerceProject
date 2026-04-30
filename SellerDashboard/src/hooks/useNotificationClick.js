const notificationRoutes = {
  order: (data) => `/order-details/${data.orderId}`,
  withdraw: (data) => `/withdraw/${data.withdrawId}`,
  message: (data) => `/chat/${data.chatId}`,
  product: (data) => `/edit-product/${data.productId}`,
  question: (data) => `/product-questions/${data.productId}/question/${data.questionId}`,
  // withdrawal: (data) => `/withdraw/${data.transactionId}`,

};

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